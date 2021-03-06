import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import moment from "moment";

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// widgets
import ChartGenero from "Components/new-Graficas/ChartGenero";
import ChartAp from "Components/new-Graficas/ChartAp";
import ChartPais from "Components/new-Graficas/ChartPais";
import ChartEdad from "Components/new-Graficas/ChartEdad";
import ChartOS from "Components/new-Graficas/ChartOS";
import ChartFecha from "Components/new-Graficas/ChartFecha";
import ChartZona from "Components/new-Graficas/ChartZona";
import ChartAnchoBanda from "Components/new-Graficas/ChartAnchoBanda";
import ChartConexionClientes from "Components/new-Graficas/ChartConexionClientes";

import CardInfo from "Components/new-Graficas/CardInfo";
import TopTables from "Components/new-Graficas/TopTables";
import LastTenUsersList from "Components/new-Graficas/LastTenUsersList";
import FullScreenLoader from 'Components/FullScreenLoader';

import {
    Card,
    CardImg,
    CardTitle,
    CardText,
    CardColumns,
    CardSubtitle,
    CardBody,
    CardImgOverlay
 } from 'reactstrap';


import FilterDateForm from 'Components/FilterDateForm/FilterDateForm';

export default class Analytical extends Component {

    constructor(props){
        super(props)

        const id_location = localStorage.user_location

        let date = moment(new Date, 'YYYY/MM/DD hh:mm a');
        let año = date.year();
        let mes = date.month()+1;
        let dia = date.date();
        let hora = date.hour();
        let minutos = date.minute();
        let initialDate = (año) + '-' + (mes) + '-' + (dia) + " 00:00";
        let finalDate = (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos);

        this.state = {
            data: [],
            lastTenUsers:[],
            topVisits:[],
			error: null,
            form: {
                filterPersonalizado: false,
                initialDate: initialDate,
                finalDate: finalDate,
                id_event: 0,
                column: ["fecha_creacion"],
                id_location: id_location,
                campania: 'Todas',
            },
            events: [],
            promedyBandwidth: [],
            totalBandwidth: [],
            promedyTimeSession: [],
            totalTimeSession: [],
            ConnectedPeopleLocation: [],
            spinnerState:false
        }
        this.ConsultaGraficas = this.ConsultaGraficas.bind(this);
        this.ConsultaEventos = this.ConsultaEventos.bind(this);
        this.handleChange=this.handleChange.bind(this)
        this.handleDateFilter=this.handleDateFilter.bind(this)
        this.handleModal = this.handleModal.bind(this)
        this.handleDateFilterCancel = this.handleDateFilterCancel.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)
        this.handleReload = this.handleReload.bind(this)
        this.TopCampanias = this.TopCampanias.bind(this);
        this.UltimosDiez = this.UltimosDiez.bind(this);
        this.TopZonas = this.TopZonas.bind(this);
        // this.TopVisitas = this.TopVisitas.bind(this);
        this.handlePromedyBandwidth = this.handlePromedyBandwidth.bind(this);
        this.handlePromedyTimeSession = this.handlePromedyTimeSession.bind(this);
        this.handleTotalBandwidth = this.handleTotalBandwidth.bind(this);
        this.handleTotalTimeSession = this.handleTotalTimeSession.bind(this);
        this.ConsultaGraficaAnchoBanda = this.ConsultaGraficaAnchoBanda.bind(this);
        this.handleConnectedPeopleLocation = this.handleConnectedPeopleLocation.bind(this);
        // this.handleConnectedOldPeopleLocation = this.handleConnectedOldPeopleLocation.bind(this);
        this.ConsultaGraficaTiempoConexion = this.ConsultaGraficaTiempoConexion.bind(this);
    }
    
    componentDidMount(){
        this.setState({
            spinnerState:true
        })
            let column = "fecha_creacion";
            this.state.form.column = [column];
            this.ConsultaGraficas(column)
            column = "mac_ap";
            this.state.form.column = [column];
            this.ConsultaGraficas(column)
            column = "os";
            this.state.form.column = [column];
            this.ConsultaGraficas(column)
            column = "id_evento";
            this.state.form.column = [column];
            this.ConsultaGraficas(column)

            this.TopCampanias();
            this.UltimosDiez();
            this.TopZonas();
            this.ConsultaEventos();
            // this.TopVisitas();
            this.handlePromedyBandwidth();
            this.handlePromedyTimeSession();
            this.handleTotalBandwidth();
            this.handleTotalTimeSession();
            this.handleConnectedPeopleLocation();
            // this.handleConnectedOldPeopleLocation();
            this.ConsultaGraficaAnchoBanda();
            this.ConsultaGraficaTiempoConexion();
            
    }
    
    async TopCampanias(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/topCampaings`, config);
            let topCampaings = await res.json()
            this.state.data.dataTop=topCampaings;
            this.setState({
                form:{
                    ...this.state.form,
                    filterPersonalizado: false,
                    spinnerState:false
                }
            });
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async UltimosDiez(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/lastTen`, config)
            let lastTenUsers = await res.json()
            this.setState({
                lastTenUsers: lastTenUsers,
                spinnerState:false
            })
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    async TopZonas(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/topZones`, config)
            let topZones = await res.json()
            this.state.data.topZones=topZones;
           
            this.setState({
                form:{
                    ...this.state.form,
                    filterPersonalizado: false,
                    spinnerState:false
                }
            });
            
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    // async TopVisitas(){
    //     this.setState({
    //         spinnerState:true
    //     })
    //     try {
    //         let config = {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(this.state.form)
    //         }
    //         let res = await fetch(`${localStorage.urlDomain}api/topVisits`, config)
    //         let topVisits = await res.json()
    //         this.setState({
    //             topVisits: topVisits,
    //             spinnerState:false
    //         })
            
    //     } catch (error) {
    //         this.setState({
    //             error:error
    //         })
    //     }
    // }

    async ConsultaGraficas(column = "fecha_creacion"){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/graficas`, config);
            let datagraph = await res.json()
            this.state.data[column] = datagraph[column];
            // this.setState({
            //     data: [ [column] = datagraph.column ]
            // })
            
            this.setState({
                form:{
                    ...this.state.form,
                    filterPersonalizado: false,
                },
                spinnerState:false
            });
        } catch (error) {
            this.setState({
                error:error
            })
        }
    }

    handleDateFilter(e = null){
        this.setState({
            spinnerState:true
        })
        if(e != null){
            e.preventDefault()
            this.componentDidMount()
        }
        this.setState({
            form:{
                ...this.state.form,
                filterPersonalizado: false,
            },
            spinnerState:false,
        });
        this.componentDidMount();
        
    }
    
    async ConsultaEventos(){
        this.setState({
            spinnerState:true
        })
        try {
            let res = await fetch(`${localStorage.urlDomain}api/events`)
            let dataevents = await res.json()
            
            this.setState({
                events: dataevents,
                spinnerState:false
            })

        } catch (error) {
            this.setState({ 
                error
            })
        }
    }

    handleChangeFilter(e){
        
        if(e.target.value != 4){
            let dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a');
            if(e.target.value == 1){
                dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a').subtract(3, 'days');
            }
            if(e.target.value == 2){
                dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a').subtract(15, 'days');
            }
            if(e.target.value == 3){
                dateAtras = moment(new Date, 'YYYY/MM/DD hh:mm a').subtract(1, 'month');
            }
            let añoAtras = dateAtras.year();
            let mesAtras = dateAtras.month()+1;
            let diaAtras = dateAtras.date();
            let minutosAtras = '00';
            let horaAtras = '00';

            if(e.target.value != 0){
                horaAtras = dateAtras.hour();
                minutosAtras = dateAtras.minute();
            }

            let dateActual = moment(new Date, 'YYYY/MM/DD hh:mm a');
            let añoActual = dateActual.year();
            let mesActual = dateActual.month()+1;
            let diaActual = dateActual.date();
            let horaActual = dateActual.hour();
            let minutosActual = dateActual.minute();

            this.state.form.id_event = 0
            this.state.form.initialDate = (añoAtras) + '-' + (mesAtras) + '-' + (diaAtras) + " " + (horaAtras) + ":" + (minutosAtras)
            this.state.form.finalDate = (añoActual) + '-' + (mesActual) + '-' + (diaActual) + " " + (horaActual) + ":" + (minutosActual)
            
            this.componentDidMount();
        }
        else{
            this.handleModal();
        }
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    handleChange(e, name=null){
        if(e.target){
            var nameCampain = e.target.options[e.target.selectedIndex].innerText;
            this.setState({
                form:{
                    ...this.state.form,
                    campania: nameCampain,
                    [e.target.name]: e.target.value
                }
            })
        }
        else if(e._d){
            let date = moment(e._d, 'YYYY/MM/DD hh:mm a');
            let año = date.year();
            let mes = date.month()+1;
            let dia = date.date();
            let hora = date.hour();
            let minutos = date.minute();
            this.setState({
                form:{
            		...this.state.form,
                    [name]: (año) + '-' + (mes) + '-' + (dia) + " " + (hora) + ":" + (minutos)
                }
            })
        }
    }

    handleModal(e = null){
        if(e != null){
            e.preventDefault()
        }
        this.state.form.filterPersonalizado = true;
        this.setState({
            form:{
                ...this.state.form,
                filterPersonalizado: true,
            }
        });
        // this.componentDidMount();
    }

    handleDateFilterCancel(e){
        e.preventDefault()
        this.setState({
            form:{
                ...this.state.form,
                filterPersonalizado: false,
            }
        });
        this.componentDidMount();
    }

    handleReload(column){
        this.ConsultaGraficas(column)
    }

    async handlePromedyBandwidth(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/promedyBandwidth`, config);
            let promedyBandwidth = await res.json()
            let type = "Bytes";
            let promedy = Math.round(promedyBandwidth.Promedio*10)/10;
            if(promedy > 1024.0){
                promedy = Math.round((promedy/1024)*10)/10;
                type = "Kb";
                if(promedy > 1024.0){
                    promedy = Math.round((promedy/1024)*10)/10;
                    type = "Mb";
                    if(promedy > 1024.0){
                        promedy = Math.round((promedy/1024)*10)/10;
                        type = "Gb";
                        if(promedy > 1024.0){
                            promedy = Math.round((promedy/1024)*10)/10;
                            type = "Tb";
                        }
                    }
                }
            }

            this.setState({
                promedyBandwidth:{
                    promedy: promedy,
                    type: type,
                },
                spinnerState:false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async handleTotalBandwidth(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/totalBandwidth`, config);
            let totalBandwidth = await res.json()
            let type = "Bytes";
            let total = Math.round(totalBandwidth.Total*10)/10;
            if(total > 1024.0){
                total = Math.round((total/1024)*10)/10;
                type = "Kb";
            }
            if(total > 1024.0){
                total = Math.round((total/1024)*10)/10;
                type = "Mb";
            }
            if(total > 1024.0){
                total = Math.round((total/1024)*10)/10;
                type = "Gb";
            }
            if(total > 1024.0){
                total = Math.round((total/1024)*10)/10;
                type = "Tb";
            }

            this.setState({
                totalBandwidth:{
                    total: total,
                    type: type,
                },
                spinnerState:false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async handlePromedyTimeSession(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/promedyTimeSession`, config);
            let promedyTimeSession = await res.json()
            let type = "Seg";
            let promedy = Math.round(promedyTimeSession.Promedio);
            if(promedy >= 60){
                promedy = Math.round((promedy/60));
                type = "Min";
                if(promedy >= 60){
                    promedy = Math.round((promedy/60));
                    type = "Hrs";
                    if(promedy >= 24){
                        promedy = Math.round((promedy/24));
                        type = "Dias";
                    }
                }
            }

            this.setState({
                promedyTimeSession:{
                    promedy: promedy,
                    type: type,
                },
                spinnerState:false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async handleTotalTimeSession(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/totalTimeSession`, config);
            let totalTimeSession = await res.json()
            let type = "Seg";
            let total = Math.round(totalTimeSession.Total);
            if(total >= 60){
                total = Math.round((total/60));
                type = "Min";
            }
            if(total >= 60){
                total = Math.round((total/60));
                type = "Hrs";
            }
            if(total >= 24){
                total = Math.round((total/60));
                type = "Días";
            }
            this.setState({
                totalTimeSession:{
                    total: total,
                    type: type,
                },
                spinnerState:false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async ConsultaGraficaAnchoBanda(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/ChartBandwidth`, config);
            let ChartBandwidth = await res.json();
            this.state.data.ChartBandwidth = ChartBandwidth;
            this.setState({
                spinnerState:false
            })
        } catch (error) {
            console.log(error);
        }
    }

    async handleConnectedPeopleLocation(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/ConnectedPeopleLocation`, config);
            let ConnectedPeopleLocation = await res.json();
            this.state.ConnectedPeopleLocation = ConnectedPeopleLocation.total;
            this.setState({
                // ConnectedPeopleLocation:ConnectedPeopleLocation.total,
                spinnerState:false
            })
        } catch (error) {
            console.log(error);
        }
    }

    // async handleConnectedOldPeopleLocation(){
    //     this.setState({
    //         spinnerState:true
    //     })
    //     try {
    //         let config = {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(this.state.form)
    //         }
    //         let res = await fetch(`${localStorage.urlDomain}api/ConnectedOldPeopleLocation`, config);
    //         let ConnectedOldPeopleLocation = await res.json();
    //         this.state.ConnectedOldPeopleLocation = ConnectedOldPeopleLocation.oldPeople;
    //         this.setState({
    //             spinnerState:false
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    

    async ConsultaGraficaTiempoConexion(){
        this.setState({
            spinnerState:true
        })
        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }
            let res = await fetch(`${localStorage.urlDomain}api/ChartTimeConnect`, config);
            let ChartTimeConnect = await res.json();
            this.state.data.ChartTimeConnect = ChartTimeConnect;
            this.setState({
                form:{
                    ...this.state.form,
                    filterPersonalizado: false,
                },
                spinnerState:false,
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { events,form } = this.state;
        const { promedyTimeSession, totalTimeSession, lastTenUsers, promedyBandwidth, totalBandwidth, topVisits, ConnectedPeopleLocation, ConnectedOldPeopleLocation, spinnerState } = this.state;
        const { location } = this.props.match.params
        return (
            <div className="cardsmasonry-wrapper" >
                {spinnerState ? 
					<FullScreenLoader />
					:
					<div>

					</div>
				}
                <PageTitleBar 
                    title={location} 
                    match={this.props.match} 
                    history={this.props.history}
                />
                <FilterDateForm
                        form={form}
                        onChange={this.handleChange}
                        onSubmit={this.handleDateFilter}
                        onClick={this.handleModal}
                        onChangeFilter={this.handleChangeFilter}
                        onCancel={this.handleDateFilterCancel}
                        campain={true}
                        events={events}
                        onClickCampania={this.handleClickCampain}
                />
                <div className="blank-wrapper" style={{marginBottom: '20px'}}>

                </div>
                
                <div className="row">
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-3 col-lg-3 d-sm-3"
                    heading={"Total Registrados"}
                    collapsible
                    fullBlock
                >
                    <div className="row" style={{ padding: '0 30px'}}>
                        <div className="col-sm-6 col-md-6 col-lg-6 d-sm-6">
                            <img style={{margin: "0 auto"}} src={require("Assets/logos/icons8-connected-people-100.png")}/>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 d-sm-6" style={{textAlign:"center"}}>
                            <p style={{margin: "0"}}>Total</p>
                            <span style={{fontSize:"55px"}}>{ConnectedPeopleLocation ? ConnectedPeopleLocation : 0}</span>
                        </div>
                    </div>
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-3 col-lg-3 d-sm-3"
                    heading={"Tiempo de Conexión"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                             <div className="row" style={{ padding: '0 30px'}}>
                                <div className="col-sm-6 col-md-6 col-lg-6 d-sm-6">
                                    <img style={{margin: "0 auto"}} src={require("Assets/logos/icons8-wi-fi-100.png")}/>
                                </div>
                                <div className="col-sm-6 col-md-6 col-lg-6 d-sm-6" style={{textAlign:"center"}}>
                                    <p>Promedio por Usuario</p>
                                    <div style={{ marginTop: "-15px", fontSize:"25px" }}> 
                                        <span>{promedyTimeSession.promedy ? promedyTimeSession.promedy : 0} </span>
                                        <span>{ promedyTimeSession.type ? promedyTimeSession.type : 'Seg' }</span>
                                    </div>
                                </div>
                            </div>
                        
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-6 col-lg-6 d-sm-6"
                    heading={"Ancho de Banda"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="row" style={{ padding: '0 5px'}}>
                        <div className="col-sm-2 col-md-2 col-lg-2 d-sm-2">
                            <img style={{margin: "0 auto"}} src={require("Assets/logos/icons8-remote-working-100.png")}/>
                            
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 d-sm-4" style={{textAlign:"center"}}>
                            <p>Promedio por Usuario</p>
                            <div style={{fontSize:"25px"}}> 
                                <span>{promedyBandwidth.promedy ? promedyBandwidth.promedy : 0} </span>
                                <span>{promedyBandwidth.type ? promedyBandwidth.type : 'Bytes'}</span>
                            </div>
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2 d-sm-2">
                            <img style={{margin: "0 auto"}} src={require("Assets/logos/icons8-cloud-backup-restore-100.png")}/>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 d-sm-4" style={{textAlign:"center"}}>
                            <p style={{}}>Total</p>
                            <div style={{fontSize:"25px"}}> 
                                <span>{totalBandwidth.total ? totalBandwidth.total : 0} </span>
                                <span>{totalBandwidth.type ? totalBandwidth.type : 'Bytes'}</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row" style={{ padding: '0 20px'}}>
                        <div className="col-sm-6 col-md-6 col-lg-6 d-sm-full">
                            <CardInfo 
                                titleName={"Promedio por Usuario"}
                                dataNum={promedyBandwidth.promedy ? promedyBandwidth.promedy : 0}
                                backgroundColor=""
                                time={` ${promedyBandwidth.type ? promedyBandwidth.type : 'Bytes'}`}
                                classColor={"primary"}
                            />
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6 d-sm-full">
                            <CardInfo 
                                titleName={"Total"}
                                dataNum={totalBandwidth.total ? totalBandwidth.total : 0}
                                backgroundColor=""
                                time={` ${totalBandwidth.type ? totalBandwidth.type : 'Bytes'}`}
                                classColor={"secondary"}
                            />
                        </div>
                    </div> */}
                </RctCollapsibleCard>

                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-12 w-xs-full"
                    heading={<IntlMessages id="graphics.date" />}
                    collapsible
                    //reloadable={this.handleReload('fecha_creacion')}
                    fullBlock
                    customClasses="overflow-hidden"
                    style={{textAlign: "center"}}
                >
                        {this.state.data.fecha_creacion && this.state.data.fecha_creacion == '' ?
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full" style={{ textAlign: "center", padding: "100px", fontSize: "20px"}}>
                                <span >No se encontraron datos</span>
                            </div>
                            :
                            <ChartFecha data={this.state.data.fecha_creacion}/>
                        }
                    
                </RctCollapsibleCard>

                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                    heading={<IntlMessages id="graphics.ap" />}
                    collapsible
                    //reloadable={this.handleReload('mac_ap')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    {this.state.data.mac_ap && this.state.data.mac_ap == '' ?
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full" style={{ textAlign: "center", padding: "100px", fontSize: "20px"}}>
                                <span >No se encontraron datos</span>
                            </div>
                            :
                            <ChartAp data={this.state.data.mac_ap} paddingRight={20}/>
                        }
                    
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                    heading={<IntlMessages id="graphics.os" />}
                    collapsible
                    //reloadable={this.handleReload('os')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    {this.state.data.os && this.state.data.os == '' ?
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full" style={{ textAlign: "center", padding: "100px", fontSize: "20px"}}>
                                <span >No se encontraron datos</span>
                            </div>
                            :
                            <ChartOS data={this.state.data.os}/>
                        }
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
                    heading={<IntlMessages id="graphics.zone" />}
                    collapsible
                    //reloadable={this.handleReload('id_evento')}
                    fullBlock
                    customClasses="overflow-hidden"
                >
                        {this.state.data.id_evento && this.state.data.id_evento == '' ?
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full" style={{ textAlign: "center", padding: "100px", fontSize: "20px"}}>
                                <span >No se encontraron datos</span>
                            </div>
                            :
                            <ChartZona data={this.state.data.id_evento} paddingRight={20}/>
                        }
                </RctCollapsibleCard>


                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-4 col-lg-12 w-xs-full"
                    heading={"Ancho de Banda VS Fecha"}
                    collapsible
                    //reloadable
                    fullBlock
                    customClasses="overflow-hidden"
                >
                    {this.state.data.ChartBandwidth == '' ?
                            <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full" style={{ textAlign: "center", padding: "100px", fontSize: "20px"}}>
                                <span >No se encontraron datos</span>
                            </div>
                            :
                            <ChartAnchoBanda data={this.state.data.ChartBandwidth} paddingRight={20}/>
                        }
                    
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="ccol-sm-12 col-md-4 col-lg-12 w-xs-full"
                    heading={"Tiempo De Conexión Promedio VS Fecha"}
                    collapsible
                    //reloadable
                    customClasses="overflow-hidden"
                    fullBlock
                >
                    {this.state.data.ChartTimeConnect == '' ?
                        <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full" style={{ textAlign: "center", padding: "100px", fontSize: "20px"}}>
                            <span >No se encontraron datos</span>
                        </div>
                        :
                        <ChartConexionClientes data={this.state.data.ChartTimeConnect} paddingRight={20}/>
                    }
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Top 5 Campañas Activas"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <TopTables
                            dataTopC={this.state.data.dataTop}
                            dataTopZ={[]}
                            name={"Campañas"}
                        />
                    </div>
                    
                </RctCollapsibleCard>
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Top 5 Zonas Activas"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <TopTables
                            dataTopC={[]}
                            dataTopZ={this.state.data.topZones}
                            name={"Zonas"}
                        />
                    </div>
                    
                </RctCollapsibleCard>
                {/* <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-6 d-sm-full"
                    heading={"Concentración De Visitas Total"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <TopTables
                            dataTopC={[]}
                            dataTopZ={[]}
                            dataTopV={topVisits}
                            name={"Visitas"}
                        />
                    </div>
                    
                </RctCollapsibleCard> */}
                <RctCollapsibleCard
                    customClasses=""
                    colClasses="col-sm-12 col-md-12 col-lg-12 d-sm-full"
                    heading={"Últimos 10 Clientes Conectados"}
                    collapsible
                    //reloadable
                    fullBlock
                >
                    <div className="col-sm-12 col-md-12 col-lg-12 d-sm-full">
                        <LastTenUsersList
                            listData={lastTenUsers}
                        />
                        <div className="blank-wrapper" style={{marginBottom: '10px'}}>

                        </div>
                    </div>
                </RctCollapsibleCard>
                </div>
            </div>
        );
	}
}
