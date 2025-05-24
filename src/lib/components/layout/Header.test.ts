import { render, screen, fireEvent } from '@testing-library/svelte';
import { vi } from 'vitest';
import Header from './Header.svelte';
import { resume } from '$lib/stores/resume';
import { loadResume } from '$lib/stores/resume';

// Mock the loadResume function
vi.mock('$lib/stores/resume', () => ({
  resume: {
    set: vi.fn(),
    subscribe: vi.fn()
  },
  loadResume: vi.fn()
}));

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders available profiles in dropdown', () => {
    render(Header);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveValue('default');
    expect(options[1]).toHaveValue('test');
  });

  it('calls loadResume when profile is changed', async () => {
    render(Header);
    
    const select = screen.getByRole('combobox');
    await fireEvent.change(select, { target: { value: 'test' } });
    
    expect(loadResume).toHaveBeenCalledWith('test');
  });

  it('loads default profile on mount', () => {
    render(Header);
    
    expect(loadResume).toHaveBeenCalledWith('default');
  });
}); 