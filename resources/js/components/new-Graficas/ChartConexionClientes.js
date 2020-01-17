/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated /* am4themes_dataviz */ from "@amcharts/amcharts4/themes/animated";
import am4lang_es_ES from "@amcharts/amcharts4/lang/es_ES";
import SweetAlert from 'react-bootstrap-sweetalert'
import MUIDataTable from "mui-datatables";
// am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ChartConexionClientes extends Component {
   constructor(props){
      super(props)

      this.state={
         props: '',
         columns: [],
         data: [],
         error: null,
         id:0,
         prompt: false,
         modaledit:false,
         zona:[],
                  		
         form: {
            nombre: ""
            }
      }
   }

   componentDidMount() {
      this.handleChart()
   }

   componentDidUpdate() {
      if(this.state.props != this.props.data){
         if (this.chart) {
            this.chart.dispose();
         }
         this.handleChart(this.props.data)
         this.setState({
            props: this.props.data
         })
      }
   }

   async handleChart(data = []) {
      let chart = am4core.create("chartTimeConnection", am4charts.XYChart);
      chart.paddingRight = 20;

      let hours = 0.5;
      for (var i = 1; i < 15; i++) {
         hours = Math.random()*(7-0+1)+0;
         data.push({ date: new Date(2019, 0, i), value: hours });
      }

      chart.data = data;
      chart.language.locale = am4lang_es_ES;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.title.text = "Fecha Por Locación";
      dateAxis.title.fontWeight = "bold";
      dateAxis.renderer.labels.template.horizontalCenter = "right";
      dateAxis.renderer.labels.template.verticalCenter = "middle";
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.labels.template.rotation = 270;
      dateAxis.renderer.minGridDistance = 0.5;


      // this makes the data to be grouped
      dateAxis.groupData = true;
      dateAxis.groupCount = 500;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Tiempo (hrs)";
      valueAxis.title.fontWeight = "bold";

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY}";
      series.tooltip.pointerOrientation = "vertical";
      series.tooltip.background.fillOpacity = 0.5;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.xAxis = dateAxis;

      let scrollbarX = new am4core.Scrollbar();
      scrollbarX.marginBottom = 20;
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
   }

   onCancel(key) {
      this.setState({ [key]: false })

   }

   openAlert(key) {
      this.setState({ [key]: true });
   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      return (
         <RctCardContent>
            <div id="chartTimeConnection" style={{ width: "100%", height: "300px" }}>
            </div>
         </RctCardContent>
      );
   }
}

export default ChartConexionClientes;