import Card from "../../components/Card";
import styled from 'styled-components'
import colors from "../../utils/style/colors";
import {Loader} from "../../utils/style/atoms";
import {useFetch, useTheme} from "../../utils/hooks";

const FreelancesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CardsContainer = styled.div`
    display: grid;
    gap: 24px;
    grid-template-rows: 350px 350px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
`

const FreelancesTitle = styled.h1`
    font-weight: 700;
    font-size: 30px;
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
    padding-bottom: 30px;
    text-align: center;
`

const FreelancesDescription = styled.h2`
    font-weight: 300;
    font-size: 20px;
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    padding-bottom: 30px;
    text-align: center;
`

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function Freelances() {
    const { theme } = useTheme()
    const { data, isLoading, error } = useFetch(
        `http://localhost:8000/freelances`
    )

    if (error) {
        return <span>Oups il y a eu un problème</span>
    }

    const resultsData = data?.freelancersList

    return (
        <FreelancesWrapper>
            <FreelancesTitle theme={theme}>
                Trouvez votre prestataire
            </FreelancesTitle>
            <FreelancesDescription theme={theme}>
                Chez Shiny nous réunissons les meilleurs profils pour vous.
            </FreelancesDescription>
            {isLoading ? (
                    <LoaderWrapper>
                        <Loader theme={theme} data-testid="loader" />
                    </LoaderWrapper>
                ) : (
                    <CardsContainer>
                        {resultsData.map((profile, index) =>  (
                            <Card
                                key={`${profile.name}-${index}`}
                                label={profile.job}
                                title={profile.name}
                                picture={profile.picture}
                            />
                        ))}
                    </CardsContainer>
                 )
            }
        </FreelancesWrapper>
    )
}

export default Freelances;