import { Fragment, useLayoutEffect, useState } from "react";
import { GameResultType } from "../../types/types";
import "./GameResults.scss";

type Props = GameResultType & {
	gameTimedOut: boolean,
	numberOfPlayers: number,
	onStartNewGame: () => void,
	onRestartGame: () => void
};

function GameResults(props: Props): JSX.Element {
	const {
		gameTimedOut,
		numberOfPlayers,
		movesNeeded,
		timeNeeded,
		playerStats,
		highScore,
		onStartNewGame,
		onRestartGame
	} = props;
	

	useLayoutEffect(() => {
		const highScoringPlayers: string[] = [];

		for (const player of playerStats) {
			if (player.score === highScore) {
				highScoringPlayers.push(player.label);
			}
		}

		
	}, [highScore, playerStats]);

	const restartGame = () => {
		onRestartGame();
	}

	const startNewGame = () => {
		onStartNewGame();
	}
	return (
		<div className="overlay">
			<div className="game-result-card">
				{/* Single player end results */}
				{numberOfPlayers === 1 && (
					<Fragment>
						{gameTimedOut && (
							<Fragment>
								<h1 className="card-heading">Time is up!</h1>
								<p className="card-description">Were you really even playing? :)</p>
							</Fragment>
						)}
						{!gameTimedOut && (
							<Fragment>
								<h1 className="card-heading">You did it!</h1>
								<p className="card-description">Game over! Here's how you got on...</p>
							</Fragment>
						)}

						<div className="result-bars">
							<div className="result-bar info-bar">
								<h3 className="bar-label">Time Elapsed</h3>
								<h2 className="bar-value">{timeNeeded.minutes}:{timeNeeded.seconds}</h2>
							</div>

							<div className="result-bar info-bar">
								<h3 className="bar-label">Moves taken</h3>
								<h2 className="bar-value">{movesNeeded} Moves</h2>
							</div>
						</div>
					</Fragment>
				)}
				<div className="control-buttons">
					<button onClick={restartGame} className="orange-button">Play Again</button>
					<button onClick={startNewGame} className="gray-button">New Game</button>
				</div>
			</div>
		</div>
	);
}

export default GameResults;
