import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import "../../../styles/components/UI/Chart/chart.css";
function Chart() {
    const options: ApexOptions = {
        chart: {
            height: 200,
            type: "heatmap",
            zoom: {
                enabled: false,
            },
        },

        stroke: {
            width: 2,
            curve: "straight",
            dashArray: [0, 10, 6],
        },
        // title: {
        //     text: "Chart",
        //     align: "left",
        //     style: { color: "#fff" },
        // },
        legend: {
            tooltipHoverFormatter: function (val: any, opts: any) {
                return (
                    val +
                    " - " +
                    opts.w.globals.series[opts.seriesIndex][
                        opts.dataPointIndex
                    ] +
                    ""
                );
            },
            labels: {
                colors: "#d6e2dd",
            },
        },
        markers: {
            size: 0,
            hover: {
                sizeOffset: 6,
            },
        },
        // xaxis: {
        //     categories: [
        //         "01 Jan",
        //         "02 Jan",
        //         "03 Jan",
        //         "04 Jan",
        //         "05 Jan",
        //         "06 Jan",
        //         "07 Jan",
        //         "08 Jan",
        //         "09 Jan",
        //         "10 Jan",
        //         "11 Jan",
        //         "12 Jan",
        //     ],

        //     labels: {
        //         style: { colors: "#cedd76" },
        //     },
        // },
        tooltip: {
            y: [
                {
                    title: {
                        formatter: function (val: any) {
                            return val + " (mins)";
                        },
                    },
                },
                {
                    title: {
                        formatter: function (val: any) {
                            return val + " per session";
                        },
                    },
                },
                {
                    title: {
                        formatter: function (val: any) {
                            return val;
                        },
                    },
                },
            ],
        },
    };
    const series = [
        {
            name: "Butter",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        },
        {
            name: "Ice Cream",
            data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
        },
        {
            name: "Money",
            data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47],
        },
        {
            name: "STAY",
            data: [17, 15, 12, 10, 20, 14, 27, 16, 17, 14, 25, 20],
        },
    ];

    return <ReactApexChart type="line" options={options} series={series} />;
}

export default Chart;
