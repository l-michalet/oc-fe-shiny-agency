import Card from './'
import {fireEvent, render, screen} from '@testing-library/react'
import { ThemeProvider } from '../../utils/Context'

describe('Card', () => {
    test('Should render title and image', async () => {
        render(
            <ThemeProvider>
                <Card
                    title="Harry Potter"
                    label="Magicien frontend"
                    picture="/myPicture.png"
                />
            </ThemeProvider>
        )
        const cardPicture = screen.getByRole('img')
        const cardTitle = screen.getByText(/Harry/i)
        expect(cardPicture.src).toBe('http://localhost/myPicture.png')
        expect(cardTitle.textContent).toBe(' Harry Potter ')
    })

    test('Should add ⭐️ to the title when selecting profile as favourite', async () => {
        render(
            <ThemeProvider>
                <Card
                    title="Harry Potter"
                    label="Magicien frontend"
                    picture="/myPicture.png"
                />
            </ThemeProvider>
        )
        const cardTitle = screen.getByText(/Harry/i)
        // eslint-disable-next-line testing-library/no-node-access
        const cardContainer = cardTitle.closest('div')

        fireEvent.click(cardContainer)
        expect(cardTitle.textContent).toBe('⭐️ Harry Potter ⭐️')
    })
})