/**
 * Transaction table section
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Scrollbars } from 'react-custom-scrollbars';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Badge } from 'reactstrap';
import SwipeableViewInfoDB from 'Components/SwipeableViewsDB/SwipeableViewInfoDB';
import SweetAlert from 'react-bootstrap-sweetalert'
// intl messages
import IntlMessages from 'Util/IntlMessages';


const LastTenUsersCampaingColumns1 = ['Posicion','Nombre', 'Apellido', 'Email', 'Celular', 'Sexo', 'Sistema Operativo', 'Fecha Registro'];
const LastTenUsersCampaingColumns2 = ['Posicion','Nombre', 'Apellido', 'MAC', 'Habitacion', 'Voucher', 'Fecha Registro'];
const LastTenUsersCampaingColumns3 = ['Posicion','Nombre', 'Apellido', 'MAC', 'Fecha Registro'];

class LastTenUsersListCampaing extends Component {
   
   constructor(props){
      super(props)
      const nombreCampania = localStorage.user_campaing_db
      this.state = {
         modalInfo: false,
         form:{
            rowData:[],
            idUsuario: "",
            userMac: "",
            nombreCampania: nombreCampania
         },
         prefferDayOfWeekDB:[]
      }
      this.openModalInfo = this.openModalInfo.bind(this)
   }

   async openModalInfo(idUsuario){
      this.setState({ 
         modalInfo: true 
      });
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario:idUsuario, nombreCampania:this.state.form.nombreCampania })
         }
         let res = await fetch(`${localStorage.urlDomain}api/userInfoDB`, config);
         let rowData = await res.json()

         this.setState({
            form:{
                  ...this.state.form,
               rowData:rowData,
               idUsuario:idUsuario
            },
         })

         let config1 = {
            method: 'POST',
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         }
         let res1 = await fetch(`${localStorage.urlDomain}api/prefferWeekDayDB`, config1);
         let prefferDayOfWeekDB = await res1.json()

         this.setState({
            prefferDayOfWeekDB:prefferDayOfWeekDB
         })
      } catch (error) {
         
      }
	}

	handleCloseModal(e){
		e.preventDefault();
		this.setState({ 
			modalInfo: false 
		});
	}

   render() {
      const { listData, vertical } = this.props;
      const { modalInfo, form, prefferDayOfWeekDB} = this.state;
      return (
         <div className="Transaction-table-wrap Tab-wrap" style={{marginTop: "4px"}}>
            
            <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={320} autoHide>
                  <div className="card mb-0 transaction-box">
                     {vertical == 'Centros Comerciales'?
                        <Table className="table-wrap" >
                           <TableHead >
                              <TableRow>
                                 {LastTenUsersCampaingColumns1.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody >
                              {listData && listData.map((list, index) => (
                                 <TableRow key={index} onClick={() => this.openModalInfo(list.id)}>
                                    <TableCell align='center'>#{index+1}</TableCell>
                                    <TableCell>{list.Nombre}</TableCell>
                                    <TableCell>{list.Apellido}</TableCell>
                                    <TableCell>{list.Email}</TableCell>
                                    <TableCell>{list.Celular}</TableCell>
                                    <TableCell align='center'>{list.Sexo}</TableCell>
                                    <TableCell>{list.Sistema_Operativo}</TableCell>
                                    <TableCell>{list.Fecha_Creacion}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                        :listData && listData[0].Voucher && listData[0].Habitacion?
                        <Table className="table-wrap" >
                           <TableHead >
                              <TableRow>
                                 {LastTenUsersCampaingColumns2.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody >
                              {listData && listData.map((list, index) => (
                                 <TableRow key={index} onClick={() => this.openModalInfo(list.id)}>
                                    <TableCell align='center'>#{index+1}</TableCell>
                                    <TableCell>{list.Nombre}</TableCell>
                                    <TableCell>{list.Apellido}</TableCell>
                                    <TableCell>{list.MAC}</TableCell>
                                    <TableCell align='center'>{list.Habitacion}</TableCell>
                                    <TableCell>{list.Voucher}</TableCell>
                                    <TableCell>{list.Fecha_Creacion}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                        :
                        <Table className="table-wrap" >
                           <TableHead >
                              <TableRow>
                                 {LastTenUsersCampaingColumns3.map((th, index) => (
                                    <TableCell key={index} className="fw-bold">{th}</TableCell>
                                 ))}
                              </TableRow>
                           </TableHead>
                           <TableBody >
                              {listData && listData.map((list, index) => (
                                 <TableRow key={index} onClick={() => this.openModalInfo(list.id)}>
                                    <TableCell align='center'>#{index+1}</TableCell>
                                    <TableCell>{list.Nombre}</TableCell>
                                    <TableCell>{list.Apellido}</TableCell>
                                    <TableCell>{list.MAC}</TableCell>
                                    <TableCell>{list.Fecha_Creacion}</TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     }
                  </div>
            </Scrollbars>
            <SweetAlert
                  customClass='lastTenUsersAlert'
						btnSize="sm"
						show={modalInfo}
                  confirmBtnText="Cerrar"
                  confirmBtnBsStyle="danger"
						onConfirm={() => this.handleCloseModal(event)}
					>
					<SwipeableViewInfoDB 
                  rowData={form.rowData}
                  idCampaing={form.idUsuario}
                  nameCampaing={form.nombreCampania}
                  userMac={form.userMac}
                  prefferDayOfWeekDB= {prefferDayOfWeekDB}
               />
				</SweetAlert>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(LastTenUsersListCampaing);
