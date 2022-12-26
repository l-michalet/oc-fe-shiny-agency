import homeImage from '../../assets/home-illustration.svg'
import styled from "styled-components";
import colors from "../../utils/style/colors";
import {StyledLink} from "../../utils/style/atoms";
import {useTheme} from "../../utils/hooks";

const HomeWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const HomeContainer = styled.div`
    background-color: ${({ theme }) => theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin: 30px;
    padding: 60px 90px;
`

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    ${StyledLink} {
        max-width: 250px;
    }
`

const HomeTitle = styled.h2`
    padding-bottom: 30px;
    max-width: 280px;
    line-height: 50px;
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const HomeImage = styled.img`
    flex: 1;
`

function Home() {
    const { theme } = useTheme()

    return (
      <HomeWrapper>
          <HomeContainer theme={theme}>
              <LeftColumn>
                  <HomeTitle theme={theme}>
                      Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents
                  </HomeTitle>
                  <StyledLink to="/survey/1" $isFullLink>
                      Faire le test
                  </StyledLink>
              </LeftColumn>
              <HomeImage src={homeImage}/>
          </HomeContainer>
      </HomeWrapper>
    )
}

export default Home
