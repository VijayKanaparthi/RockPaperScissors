import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class Home extends Component {
  state = {
    isGameRunning: 'true',
    score: 0,
    result: '',
  }

  verify = (myChoice, random) => {
    if (myChoice.id === 'ROCK') {
      switch (random.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'SCISSORS':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (myChoice.id === 'PAPER') {
      switch (random.id) {
        case 'ROCK':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (random.id) {
        case 'ROCK':
          return 'YOU LOSE'
        case 'PAPER':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  clicked = id => {
    const {score} = this.state
    const random = choicesList[Math.floor(Math.random() * choicesList.length)]
    const myChoice = choicesList.filter(each => each.id === id)
    const findResult = this.verify(myChoice[0], random)
    console.log(random)
    console.log(findResult)
    let newScore = score
    if (findResult === 'YOU WON') {
      newScore += 1
    } else if (findResult === 'YOU LOSE') {
      newScore -= 1
    } else {
      newScore = score
    }
    this.setState({
      score: newScore,
      result: findResult,
      isGameRunning: false,
      newArray: [myChoice[0], random],
    })
  }

  restartGame = () => this.setState({isGameRunning: true})

  gameRunning = () => (
    <>
      <div className="gaming-container">
        <div className="first-two">
          <button
            type="button"
            className="game-buttons"
            onClick={() => this.clicked(choicesList[0].id)}
            data-testid="rockButton"
          >
            <img
              src={choicesList[0].imageUrl}
              alt={choicesList[0].id}
              className="game-images"
            />
          </button>
          <button
            type="button"
            className="game-buttons"
            onClick={() => this.clicked(choicesList[1].id)}
            data-testid="scissorsButton"
          >
            <img
              src={choicesList[1].imageUrl}
              alt={choicesList[1].id}
              className="game-images"
            />
          </button>
        </div>
        <div className="last">
          <button
            type="button"
            className="game-buttons"
            onClick={() => this.clicked(choicesList[2].id)}
            data-testid="paperButton"
          >
            <img
              src={choicesList[2].imageUrl}
              alt={choicesList[2].id}
              className="game-images"
            />
          </button>
        </div>
      </div>
    </>
  )

  gamingNotRunning = () => {
    const {newArray, result} = this.state
    return (
      <>
        <div className="result-view-container">
          <div className="first-two-images-container">
            <div className="result-images">
              <p>YOU</p>
              <img
                src={newArray[0].imageUrl}
                alt="your choice"
                className="game-images"
              />
            </div>
            <div className="result-images">
              <p>OPPONENT</p>
              <img
                src={newArray[1].imageUrl}
                alt="opponent choice"
                className="game-images"
              />
            </div>
          </div>
          <div className="result-button-container">
            <div>
              <p>{result}</p>
            </div>
            <div>
              <button
                type="button"
                className="play-again-button"
                onClick={this.restartGame}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {score, isGameRunning} = this.state
    console.log(score)
    return (
      <div className="background">
        <div className="card">
          <div>
            <h1>
              ROCK <br /> PAPER <br /> SCISSORS
            </h1>
          </div>
          <div className="score-card">
            <p>Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        {isGameRunning ? this.gameRunning() : this.gamingNotRunning()}
        <div>
          <Popup
            modal
            trigger={
              <div className="rules-button-container">
                <button type="button" className="rules-button">
                  Rules
                </button>
              </div>
            }
          >
            {close => (
              <div className="rules-container">
                <button
                  type="button"
                  onClick={() => close()}
                  className="popup-close-button"
                >
                  <RiCloseLine size={25} />
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="rules-image"
                />
              </div>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}
export default Home
