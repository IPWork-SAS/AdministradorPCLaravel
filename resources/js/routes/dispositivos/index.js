import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import './styles.css'




export default class dispositivos extends Component {
	constructor(props) {
		super(props)
		const id_zona = localStorage.user_zona
		const name_zone = localStorage.user_name_zona

		this.state = {
			data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id: 0,
			dispositivo: [],
			modaledit: false,
			name_zone: name_zone,
			form: {
				nombre_dispositivo: "",
				mac_dispositivo: "",
				tecnologia: "",
				id_zona: id_zona,
			},
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);

	}
	async componentDidMount() {
		const id_location = localStorage.user_location
		const id_zona = localStorage.user_zona
		const { location } = this.props

		try {
			let res = await fetch(`${localStorage.urlDomain}api/zonas/${id_location}`)
			let data = await res.json()

			this.setState({
				data: data,
				form: {
					id_location: id_location
				}
			})

		} catch (error) {
			this.setState({
				error
			})
		}

		try {
			let res = await fetch(`${localStorage.urlDomain}api/dispositivos/` + id_zona)
			let datadispositivos = await res.json()
			for (let i = 0; i < datadispositivos.length; i++) {
				datadispositivos[i]["Editar"] = <Link to={location.pathname} onClick={() => this.openAlertTest('modaledit', datadispositivos[i].id)}>
					<ListItemIcon className="menu-icon">
						<i className='ti-pencil-alt' style={{ margin: "0 auto" }}></i>
					</ListItemIcon>
				</Link>
			}

			this.setState({
				datadispositivos: datadispositivos
			})


		} catch (error) {
			this.state = {
				error: error
			}
		}
	}


	async handleSubmit(e) {
		e.preventDefault()
		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/dispositivos`, config);
			//    this.props.history.push('app/dispositivos') 
			this.setState({
				prompt: false
			})

			this.componentDidMount();

		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}

	async handleEdit(e) {
		e.preventDefault()
		try {
			let config = {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/dispositivos/` + this.state.form.id_dispositivo, config);
			this.setState({
				modaledit: false
			})

			this.componentDidMount();
			// this.setState({
			// 	state:this.state
			// })




		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}

	onConfirm(key) {
		this.setState({ [key]: false })
	}

	/**
	 * Open Alert
	 * @param {key} key
	 */
	openAlert(key) {
		this.setState({ [key]: true });
	}
	async openAlertTest(key, id) {
		this.setState({ [key]: true });
		let res = await fetch(`${localStorage.urlDomain}api/dispositivos/${id}/edit`);
		let dispositivo = await res.json();

		this.setState({
			form: {
				nombre_dispositivo: dispositivo.nombre_dispositivo,
				mac_dispositivo: dispositivo.mac_dispositivo,
				tecnologia: dispositivo.tecnologia,
				id_zona: dispositivo.id_zona,
				id_dispositivo: id,
			}
		});

	}

	/**
	 * On Cancel dialog
	 * @param {string} key
	 */
	onCancel(key) {
		this.setState({ [key]: false })
	}
	handleChange(e) {
		this.state.form[e.target.name] = e.target.value;
	}
	handleChangeEdit(e) {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value
			}
		})
	}
	render() {
		const { data, prompt, modaledit, name_zone} = this.state;
		const columns = ['Nombre Dispositivo', 'Mac Dispositivo', 'Tecnologia'
			, 'Editar'];
		const options = {
			filterType: 'dropdown',
			selectableRows: false,
			responsive: 'scrollMaxHeight',
			print: false,
			download: false
		};
		return (
			<div className="blank-wrapper">
				<Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet>


				<PageTitleBar
					title={"Dispositivos de "+ name_zone}
					match={this.props.match}
					history={this.props.history}
				/>

				<div className="blank-wrapper">

					<Button
						variant="contained"
						color="primary"
						className="botonDisp"
						onClick={() => this.openAlert('prompt')}
					>
						Agregar Dispositivo
					</Button>

					<div className="sweet-alert-wrapper">

						<SweetAlert

							btnSize="sm"
							show={prompt}
							showCancel
							confirmBtnText="Guardar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="primary"
							title="Agregar Dispositivo"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('prompt')}
						>



							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className=" col-lg-5 mb-4 ml-3">
										<Input
											type="text"
											name="nombre_dispositivo"
											id="nombre_dispositivo"
											className="has-input input-lg"
											placeholder="Nombre Dispositivo"
											onChange={() => this.handleChange(event)}

										/>



									</div>
									<div className=" col-lg-5 mb-4 ml-3">
										<Input
											type="text"
											name="mac_dispositivo"
											id="mac_dispositivo"
											className="has-input input-lg"
											placeholder="Mac Dispositivo"
											onChange={() => this.handleChange(event)}

										/>
									</div>
								</div>
								<div className="row">
									<div className=" col-lg-5 mb-4 ml-3">
										<Input
											type="text"
											name="tecnologia"
											id="tecnologia"
											className="has-input input-lg"
											placeholder="Tecnologia"
											onChange={() => this.handleChange(event)}

										/>



									</div>
									<div className=" col-lg-5 mb-4 ml-3">
										<Select name="id_zona" native onChange={() => this.handleChange(event)}
											className="has-input input-lg"
										>
											<option value="">Seleccione una zona</option>
											{data && data.map((data) => (

												<option key={data.id} value={data.id}>{data.nombre}</option>
											))}

										</Select>
									</div>
								</div>

							</form>


						</SweetAlert>

						<SweetAlert

							btnSize="sm"
							show={modaledit}
							showCancel
							confirmBtnText="Editar"
							cancelBtnText="Cancelar"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="primary"
							title="Editar Dispositivo"
							onConfirm={() => this.handleEdit(event)}
							onCancel={() => this.onCancel('modaledit')}
						>



							<form onSubmit={this.handleEdit}>
								<div className="row">
									<div className=" col-lg-5 mb-4 ml-3">
										<Input
											type="text"
											name="nombre_dispositivo"
											id="nombre_dispositivo"
											value={this.state.form.nombre_dispositivo}
											className="has-input input-lg"
											placeholder="Nombre Dispositivo"
											onChange={() => this.handleChangeEdit(event)}

										/>



									</div>
									<div className=" col-lg-5 mb-4 ml-3">
										<Input
											type="text"
											name="mac_dispositivo"
											id="mac_dispositivo"
											value={this.state.form.mac_dispositivo}
											className="has-input input-lg"
											placeholder="Mac Dispositivo"
											onChange={() => this.handleChangeEdit(event)}

										/>
									</div>
								</div>
								<div className="row">
									<div className=" col-lg-5 mb-4 ml-3">
										<Input
											type="text"
											name="tecnologia"
											id="tecnologia"
											value={this.state.form.tecnologia}
											className="has-input input-lg"
											placeholder="Tecnologia"
											onChange={() => this.handleChangeEdit(event)}

										/>



									</div>
									<div className=" col-lg-5 mb-4 ml-3">
										<Select name="id_zona" native onChange={() => this.handleChangeEdit(event)}
											className="has-input input-lg"
											value={this.state.form.id_zona}
										>
											<option value="">Seleccione una zona</option>
											{data && data.map((data) => (

												<option key={data.id} value={data.id}>{data.Nombre}</option>
											))}

										</Select>
									</div>
								</div>

							</form>


						</SweetAlert>
					</div>
				</div>


				<RctCollapsibleCard fullBlock>
					<MUIDataTable
						className={'mui-tableRes'}
						title={"Dispositivos"}
						data={this.state.datadispositivos}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
