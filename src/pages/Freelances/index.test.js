import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Freelances from './'
import { render } from '../../utils/test'

const freelancersMockedData = [
    {
        name: 'Harry Potter',
        job: 'Magicien frontend',
        picture: '',
    },
    {
        name: 'Hermione Granger',
        job: 'Magicienne fullstack',
        picture: '',
    },
]

const server = setupServer(
    rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
        return res(ctx.json({ freelancersList: freelancersMockedData }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Loading and display after Api calls", () => {
    it('Should render without crash', async () => {
        render(<Freelances />)

        expect(screen.getByTestId('loader')).toBeTruthy()
    })
    it('Should display freelancers names', async () => {
        render(<Freelances />)

        expect(screen.getByTestId('loader')).toBeTruthy()
        await waitFor(() => {
            expect(screen.getByText('Harry Potter')).toBeTruthy()
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText('Hermione Granger')).toBeTruthy()
        })
    })
    it('Should display freelancers names after loader is removed', async () => {
        render(<Freelances />)

        // eslint-disable-next-line testing-library/prefer-query-by-disappearance
        await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
        expect(screen.getByText('Harry Potter')).toBeInTheDocument()
        expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    })

})