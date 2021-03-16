import React from "react";

export class MusicPlayer extends React.Component {
	constructor() {
		super();
		this.state = {
			datos: [],
			play: false,
			url: "",
			position: null
		};
		(this.player = null), (this.Play = this.Play.bind(this));
	}
	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => response.json())
			.then(data => {
				this.setState({ datos: data });
			});
	}
	Play(i) {
		let url = this.state.datos[i].url;
		let position = i;
		this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
		this.player.play();
		this.setState({ url: url, play: true, position: position });
	}

	Backwards() {
		if (this.state.position > 0) {
			let position = this.state.position - 1;
			let url = this.state.datos[position].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, position: position, play: true });
		} else {
			let position = this.state.datos.length - 1;
			let url = this.state.datos[position].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, position: position, play: true });
		}
	}

	PausePlay() {
		if (this.state.position == null) {
			this.Play(0);
		} else {
			let play = !this.state.play;
			play ? this.player.play() : this.player.pause();
			this.setState({ play: play });
		}
	}
	Forward() {
		if (this.state.position < this.state.datos.length - 1) {
			let position = this.state.position + 1;
			let url = this.state.datos[position].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, position: position, play: true });
		} else {
			let position = 0;
			let url = this.state.datos[position].url;
			this.player.src = "https://assets.breatheco.de/apis/sound/" + url;
			this.player.play();
			this.setState({ url: url, position: position, play: true });
		}
	}
	ChangeSymbol() {
		let simbolo = this.state.play
			? "fas fa-pause-circle fa-2x"
			: "fas fa-play-circle fa-2x";
		return simbolo;
	}

	render() {
		return (
			<div>
				{this.state.datos.map((song, i) => {
					return (
						<div
							className=" canciones btn btn-dark btn-lg d-flex row"
							key={i}
							onClick={() => this.Play(i)}>
							<div className="col-2 text-center">{song.id}</div>
							<div className="col-10 ">{song.name}</div>
						</div>
					);
				})}
				<audio ref={t => (this.player = t)} type="audio/mpeg"></audio>
				<div id="espacio"></div>
				<div className="barra fixed-bottom d-flex justify-content-around align-items-center">
					<div>
						<i
							className="fas fa-step-backward"
							onClick={() => this.Backwards()}></i>
					</div>
					<div>
						<i
							className={this.ChangeSymbol()}
							onClick={() => this.PausePlay()}></i>
					</div>
					<div>
						<i
							className="fas fa-step-forward"
							onClick={() => this.Forward()}></i>
					</div>
				</div>
			</div>
		);
	}
}
