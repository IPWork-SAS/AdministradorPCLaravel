/**
 * Sales doughnut chart
*/
import React, { Component } from 'react';

/* amChart Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// rct card box
import { RctCardContent } from 'Components/RctCard';

class ChartOS extends Component {

   componentDidMount() {
      this.handleChart()
   }

   componentDidUpdate() {
      this.handleChart(this.props.data)
   }

   async handleChart(data = []) {
      let chart = am4core.create("chartos", am4charts.XYChart);
      chart.scrollbarX = new am4core.Scrollbar();

      // Add data
      chart.data = data;

      // Create axes
      var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "os";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;

      var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

      // Create series
      var series = chart.series.push(new am4charts.ColumnSeries3D());
      series.dataFields.valueX = "personas";
      series.dataFields.categoryY = "os";
      series.name = "Personas";
      series.columns.template.propertyFields.fill = "color";
      series.columns.template.tooltipText = "{valueX}";
      series.columns.template.column3D.stroke = am4core.color("#fff");
      series.columns.template.column3D.strokeOpacity = 0.2;
   }

   componentWillUnmount() {
      if (this.chart) {
         this.chart.dispose();
      }
   }

   render() {
      return (
         <RctCardContent>
            <div id="chartos" style={{ width: "100%", height: "300px" }}></div>
         </RctCardContent>
      );
   }
}

export default ChartOS;