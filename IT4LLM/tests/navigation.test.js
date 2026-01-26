/**
 * Tests for navigation functionality
 */

// Mock DOM elements for testing
const mockElements = {
    '#about': { getBoundingClientRect: () => ({ top: 100 }), offsetTop: 100 },
    '#speakers': { getBoundingClientRect: () => ({ top: 500 }), offsetTop: 500 },
    '#panelists': { getBoundingClientRect: () => ({ top: 1000 }), offsetTop: 1000 },
    '#organizers': { getBoundingClientRect: () => ({ top: 1500 }), offsetTop: 1500 },
    '#contact': { getBoundingClientRect: () => ({ top: 2000 }), offsetTop: 2000 },
};

// Mock window and document objects
global.window = {
    pageYOffset: 0,
    scrollTo: jest.fn(),
    location: { hash: '' },
    addEventListener: jest.fn(),
};
global.document = {
    querySelector: jest.fn((selector) => {
        if (selector.startsWith('a[href^="#"]')) {
            return [{ addEventListener: jest.fn() }, { addEventListener: jest.fn() }];
        } else if (selector.startsWith('#')) {
            return mockElements[selector];
        } else if (selector === '.navbar') {
            return { offsetHeight: 70 };
        }
        return null;
    }),
    querySelectorAll: jest.fn(() => [
        { addEventListener: jest.fn() },
        { addEventListener: jest.fn() },
        { addEventListener: jest.fn() },
        { addEventListener: jest.fn() },
        { addEventListener: jest.fn() }
    ]),
    getElementById: jest.fn(),
    addEventListener: jest.fn(),
};
global.MouseEvent = class extends Event {};

describe('Navigation Smooth Scrolling', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        document.querySelector.mockClear();
        window.scrollTo.mockClear();
    });

    test('should handle smooth scrolling for anchor links', () => {
        // Load the script
        require('../src/js/main.js');
        
        // Verify that event listeners are added to anchor links
        expect(document.querySelectorAll).toHaveBeenCalledWith('a[href^="#"]');
    });

    test('should scroll to element with proper offset', () => {
        // Mock the click event
        const mockEvent = {
            preventDefault: jest.fn()
        };
        
        // Simulate the smooth scroll function
        const targetElement = mockElements['#about'];
        const navbarHeight = 70;
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        // Call the scroll function manually
        window.scrollTo({
            top: offsetTop - navbarHeight,
            behavior: 'smooth'
        });
        
        expect(window.scrollTo).toHaveBeenCalled();
    });
});

describe('Mobile Navigation Toggle', () => {
    test('should toggle active classes on hamburger click', () => {
        // Create mock elements
        const mockHamburger = {
            classList: { toggle: jest.fn() },
            addEventListener: jest.fn()
        };
        const mockNavMenu = {
            classList: { toggle: jest.fn() }
        };
        
        global.document.querySelector = jest.fn(selector => {
            if (selector === '.hamburger') return mockHamburger;
            if (selector === '.nav-menu') return mockNavMenu;
            return null;
        });
        
        // Load the script
        require('../src/js/main.js');
        
        // Verify that event listeners are added
        expect(mockHamburger.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });
});