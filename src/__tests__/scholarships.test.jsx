import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Scholarships from "../pages/scholarships";
import { useScholarshipContext } from "../context/scholarshipContext";
import { formatDate, getDaysRemaining } from "../utils/dateUtils";

vi.mock('../context/scholarshipContext.jsx', () => ({
    useScholarshipContext: () => ({
        scholarships:[
            {
                id: 'test-123',
                scholarshipName: 'Boettcher Scholarship',
                amount: 20000,
                deadline: '2026-11-15',
                priority: 'High',
                status: 'In Progress',
                tasks: []
            }
        ],
        filteredAndSortedScholarships: [
            {
                id: 'test-123',
                scholarshipName: 'Boettcher Scholarship',
                amount: 20000,
                deadline: '2026-11-15',
                priority: 'High',
                status: 'In Progress',
                tasks: []
            }
        ],
        handleToggleTask: vi.fn(),
        formatDate: () => 'Nov 15, 2026',
        getDaysRemaining: () => ({text: '137 Days Left', className: 'countdown-normal'}),
        filters: { search: '', status: 'all', priority: 'all', sortBy: 'dealine'},
        handleFilterChange: vi.fn()
    })
}));

describe('<Scholarships /> Page Test Suite', () => {
    it('renders scholarship information and formtas currency displays correctly', () => {
        render(
            <BrowserRouter>
                <Scholarships
                    handleAddButton={vi.fn()}
                    handleEdit={vi.fn()}
                    handleDelete={vi.fn()}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(/Boettcher Scholarship/i)).toBeInTheDocument();
        expect(screen.getByText(/\$20,000/i)).toBeInTheDocument();
        expect(screen.getByText(/Days Left|Due Today!|Overdue/i)).toBeInTheDocument();
    });
});