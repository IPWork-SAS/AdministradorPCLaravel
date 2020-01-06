import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import SweetAlert from 'react-bootstrap-sweetalert'
import CustomToolbar from "../../util/CustomToolbar";
import { Input, Select, Button } from '@material-ui/core';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import './styles.css'

export default class Vouchers extends Component {
	constructor(props) {
		super(props)

		const id_location = localStorage.user_location

		this.state = {
			data: [],
			error: null,
			activeStep: 0,
			prompt: false,
			id_location: id_location,
			campania: [],
			modaledit: false,
			form: {
				email: '',
				columns: [],
				rows: [],
				id_location: id_location,
			},
			nameColumns: ['Campaña','Voucher', 'Fecha Inicio', 'Fecha Fin', 'Estado'],
			dataVouchers: [],
			modalEmailCsv: false,
		}

		this.createVoucher = this.createVoucher.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

	}

	async componentDidMount(){
		try {
			let config = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};
			let res = await fetch(`${localStorage.urlDomain}api/vouchers`, config);
			let datavouchers = await res.json()

			this.setState({ 
				dataVouchers: datavouchers,
			});

		} catch (error) {
			console.log(error)
		}
	}

	// CSV //
	handleChangeEmailCsv(e) {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value,
				columns: this.state.nameColumns,
				rows: this.state.dataVouchers
			}
		})
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

			let res = await fetch(`${localStorage.urlDomain}api/csvEmail`, config);
			let data = await res.json();


			if (data.error) {
				NotificationManager.error(data.error, '', 4000);
			}
			if (data.message && !data.errors) {
				NotificationManager.success(data.message, '', 4000);
				this.setState({
					modalEmailCsv: false
				})
			}

		} catch (error) {
			console.log(error);
			this.setState({
				error
			});
		}
	}



	openAlert(key) {
		this.setState({ [key]: true });
	}

	createVoucher() {
		const { location } = this.props;
		this.props.history.push(location.pathname + '/create')
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
		this.componentDidMount();
	}

	render() {
		const { dataVouchers, modalEmailCsv } = this.state;
		const columns = this.state.nameColumns;
		const options = {
			responsive: 'scrollMaxHeight',
			print: false,
			downloadOptions: {
				filename: 'Vouchers.csv',
				filterOptions: {
					useDisplayedRowsOnly: true,
					useDisplayedColumnsOnly: true
				}
			},
			customToolbar: () => {
				return (
					<CustomToolbar columns={columns} data={dataVouchers} alertOpen={() => this.openAlert('modalEmailCsv')} />
				);
			},
			elevation: 0
		};
		return (
			<div className="blank-wrapper">
				<Helmet>
					<meta name="description" content="Reactify Blank Page" />
				</Helmet>


				<PageTitleBar
					title={<IntlMessages id="vouchers" />}
					match={this.props.match}
				/>
				<div className="blank-wrapper">
					<div className="sweet-alert-wrapper">

						<SweetAlert
							btnSize="sm"
							show={modalEmailCsv}
							showCancel
							confirmBtnText="Send"
							cancelBtnText="Cancel"
							cancelBtnBsStyle="danger"
							confirmBtnBsStyle="success"
							title="Send Email CSV"
							onConfirm={() => this.handleSubmit(event)}
							onCancel={() => this.onCancel('modalEmailCsv')}
						>

							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-6 mb-6 ml-6 offset-3">
										<Input
											type="email"
											name="email"
											id="email"
											value={this.state.form.email}
											className="has-input input-lg"
											placeholder="Email Csv"
											onChange={() => this.handleChangeEmailCsv(event)}
										/>
									</div>

								</div>
							</form>
						</SweetAlert>

					</div>
				</div>
				<RctCollapsibleCard fullBlock>
					<div className="row">
						<div className="col-lg-6">

							{/* <Select name="campaña" native onChange={() => this.handleChange(event)}
								className="has-input input-lg"
							>
								<option value="">Seleccione una campaña</option>
								{data && data.map((data) => (

									<option key={data.id} value={data.id}>{data.nombre}</option>
								))}

							</Select> */}
						</div>
						<div className="col-lg-3">
							<Button
								variant="contained"
								color="primary"
								className="boton"
								onClick={() => this.createVoucher()}
							>
								Crear Vouchers
							</Button>
						</div>
					</div>
					<br></br>
				</RctCollapsibleCard>

				<RctCollapsibleCard fullBlock>

					<MUIDataTable
						title={"Lista Vouchers"}
						data={this.state.dataVouchers}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>

			</div>

		);
	}
}
