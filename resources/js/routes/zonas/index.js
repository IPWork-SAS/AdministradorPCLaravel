import React, { Component } from "react";
import { Helmet } from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import MUIDataTable from "mui-datatables";
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Route, Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import queryString from 'query-string';


import './styles.css'




export default class zona extends Component {
	constructor(props){
		super(props)
		
        this.state = {
            data: [],
			error: null,
			activeStep: 0,
			id:0,
			prompt: false,
			modaledit:false,
			zona:[],
            form: {
				nombre: "",
		   },
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.openAlertTest = this.openAlertTest.bind(this);
	}     
	async componentDidMount(){
		if(!this.props.location.state){
            this.props.history.push('/');
		}
		const { id_location } = this.props.location.state;
		const { location } = this.props;
	
		console.log(id_location)
		try {
		   let res = await fetch(`${localStorage.urlDomain}api/zonas/${id_location}`)
		   let data = await res.json();
		   
		   for (let i = 0; i < data.length; i++) {
			data[i]["acciones"]=<Link to={location.pathname} onClick={() => this.openAlertTest('modaledit',data[i].id)}>Editar</Link>
		}
		this.setState({
			data: data,
			form: {
				id_location: id_location
			}
		})
	
		} catch (error) {
		   this.setState({
			   error,
		   })
		}
	}

	async handleSubmit(e) {
		e.preventDefault()	
		console.log(this.state.form)
	   try {
		   let config = {
			   method: 'POST',
			   headers: {
				   'Accept': 'application/json',
				   'Content-Type': 'application/json'
			   },
			   body: JSON.stringify(this.state.form)
		   };
		   
			await fetch(`${localStorage.urlDomain}api/zonas`, config);

			this.componentDidMount();

			this.setState({
				prompt: false
			})
		  } catch (error) {
			 console.log(error);
		     this.setState({
		   	 error
		     });
		  }		
	}

	async handleEdit(e) {
		e.preventDefault();
		try {
			let config = {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.form)
			};

			await fetch(`${localStorage.urlDomain}api/zonas/`+this.state.form.id_zona, config);
		   
			this.componentDidMount();

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
		// console.log(this.state.id_locacion);	
		
	}

	async openAlertTest(key,id) {
		this.setState({ [key]: true});
		let res = await fetch(`${localStorage.urlDomain}api/zonas/${id}/edit`);
		let zona = await res.json();

		   this.setState({ form:{
			   nombre: zona.nombre,
			   id_zona: id,
		   } });
		 
	}

	direccionar() {
		this.props.history.push("dispositivos");
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
			 form:{
				...this.state.form,
				[e.target.name] : e.target.value
			 }
		 })
	 }
    render() {
		const {data} = this.state;
        const columns = ['nombre','acciones'];
        const { basic, withDes, success, warning, customIcon, withHtml, prompt, passwordPrompt, customStyle,modaledit } = this.state;
		const options = {
			filterType: 'dropdown',
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
                    title={<IntlMessages id="sidebar.zonas" />}
                    match={this.props.match}
                />
					<div className="blank-wrapper">
					<Button
						variant="contained"
						color="primary"
						className="botonDisZon"
						onClick={() => this.direccionar()}
						>Agregar dispositivos
					</Button>
				
					<Button
						style={{'marginRight':'20px'}}
						variant="contained"
						color="primary"
						className="botonDisZon1"
						onClick={() => this.openAlert('prompt')}
					>Crear Zona
					</Button>
					<div className="sweet-alert-wrapper">
					
					
					
						
			
				<SweetAlert

					btnSize="sm"
					show={prompt}
					showCancel
					confirmBtnText="Guardar"
					cancelBtnText="Cancelar"
					cancelBtnBsStyle="danger"
					confirmBtnBsStyle="success"
					title="Crear Zona"
					onConfirm={() => this.handleSubmit(event)}
					onCancel={() => this.onCancel('prompt')}
			>
			
			
             
					<form onSubmit={this.handleSubmit}>
					<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="nombre"
							id="nombre"
							
							className="has-input input-lg"
							placeholder="Nombre"
							onChange={() => this.handleChange(event)}

							   />
							   
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
					confirmBtnBsStyle="success"
					title="Editar Zona"
					onConfirm={() => this.handleEdit(event)}
					onCancel={() => this.onCancel('modaledit')}
			>
             
					<form onSubmit={this.handleEdit}>
					<div className="row">			
						 <div className=" col-lg-5 mb-4 ml-3">
							<Input
							type="text"
							name="nombre"
							id="nombre"
							value={this.state.form.nombre}
							className="has-input input-lg"
							placeholder="Nombre"
							onChange={() => this.handleChangeEdit(event)}

							/>
							   
						</div>
						</div>
						
						</form>
			
            
    </SweetAlert>	
		</div>
		</div>
	
				
                
		<RctCollapsibleCard  fullBlock >
			
					<MUIDataTable
						className="mui-tableRes"
						title={"Zonas"}
						data={data}
						columns={columns}
                        options={options}
					/>
				</RctCollapsibleCard>       
                          
                    </div>
                
                
		
        	
        );
    }
}
