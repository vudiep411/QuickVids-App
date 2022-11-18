import Home, { getServerSideProps } from  '../../pages/index'
import Navbar from '../../components/Navbar';
import Comments from '../../components/Comments';
import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react";

describe('Basic Rendering and functionalities Check', () => {
    it('Check if Navbar Search functionality exists', () => {
        render(<Navbar/>)
        expect(screen.getByTestId("search")).toBeInTheDocument();
    })
})