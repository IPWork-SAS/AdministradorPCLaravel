/**
 * Transaction table section
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ContactProfileDB from 'Components/SwipeableViewsDB/ContactProfileDB';
import DetailConnectionDB from 'Components/SwipeableViewsDB/DetailConnectionDB';
import VisitHistory from 'Components/SwipeableViews/VisitHistory';
import CardInfo from "Components/new-Graficas/CardInfo";
import 'Components/SwipeableViewsDB/styles.css';

function TabContainer({ children, dir }) {
   return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3, overflowX: 'hidden' }}>
         {children}
      </Typography>
   );
}

class SwipeableViewInfoDB extends Component {

   constructor(props) {
      super(props)

      this.state = {
         value: 0,
         form: {
            rowData: "",
            idUsuario: "",
            nombreCampania: ""
         },
         props: '',
         visitHistory: [],
      }
   }

   handleChangeTabs = (event, value) => {
      this.setState({ value });
   };

   componentDidUpdate(){
      const { rowData } = this.props;
      if(this.state.props != rowData){
         this.state.form.rowData = rowData;
         this.state.props = rowData;
         this.handleVisitHistory();
      }
   }

   handleChangeTabsIndex = index => {
      this.setState({ value: index });
   };

   async handleVisitHistory(){
      try {
         let config = {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.form)
         }
         let res = await fetch(`${localStorage.urlDomain}api/visitHistoryDB`, config);
         let visitHistory = await res.json()
         this.setState({
            visitHistory: visitHistory
         })
      } catch (error) {

      }
   }

   render() {
      const { visitHistory } = this.state;
      const { rowData, prefferDayOfWeekDB } = this.props;
      const theme = {
         direction: 'rlt'
      }
      return (
         <div className="Tab-wrap">
            <AppBar position="static" color="default">
               <Tabs
                  value={this.state.value}
                  onChange={this.handleChangeTabs}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="standard"
               >
                  <Tab label={'Perfil de Contacto'} />
                  <Tab label={'Detalle de Conexión'} />
                  <Tab label={'Historial de Visitas'} />
               </Tabs>
            </AppBar>
            <SwipeableViews
               axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
               index={this.state.value}
               onChangeIndex={this.handleChangeTabsIndex}>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                           <ContactProfileDB
                              rowData={rowData}
                           />
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <div className="row">
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6 col-md-6">
                           <DetailConnectionDB
                              rowData={rowData}
                           />
                        </div>
                        <div className="col-lg-6 col-sm-6 col-xl-6 col-6 col-md-6">
                           <CardInfo
                              titleName={"Tiempo de conexión(hrs)"}
                              dataNum={250}
                              backgroundColor=""
                              classColor="primary"
                              className="styleCard1"
                              customIcon="timer"
                           />
                           {prefferDayOfWeekDB[0] ?
                              <CardInfo
                                 titleName={`Día más visitado:  ${(prefferDayOfWeekDB[0].dia_preferido).charAt(0).toUpperCase() + (prefferDayOfWeekDB[0].dia_preferido).slice(1)}`}
                                 dataNum={prefferDayOfWeekDB[0].cantidad}
                                 backgroundColor=""
                                 classColor="secondary"
                                 className="styleCard1"
                                 customIcon="calendar-alt"
                              />
                              :
                              <div>

                              </div>
                           }
                        </div>
                     </div>
                  </TabContainer>
               </div>
               <div className="card mb-0 transaction-box">
                  <TabContainer dir={theme.direction}>
                     <VisitHistory
                        visitHistory={visitHistory}
                     />
                  </TabContainer>
               </div>
            </SwipeableViews>
         </div>
      );
   }
}

export default withStyles(null, { withTheme: true })(SwipeableViewInfoDB);
