import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import { ResponsiveContainer,
        AreaChart,
        XAxis,
        YAxis,
        Legend,
        Line,
        LineChart,
        Tooltip,
        Area,
        Bar,
        BarChart,
        CartesianGrid, } from 'recharts'

const Row1 = () => {
    const { palette} = useTheme();
    const {data} = useGetKpisQuery();
    console.log("data:", data);

    const revenue = useMemo(() => {
        return (
          data &&
          data[0].monthlyData.map(({ month, revenue }) => {
            return {
              name: month.substring(0, 3),
              revenue: revenue,
            };
          })
        );
      }, [data]);

    const revenueExpenses = useMemo(()=>{
        return(
            data &&
            data[0].monthlyData.map(({month, revenue, expenses})=>{
                return {
                    name: month.substring(0,3),
                    revenue: revenue,
                    expenses: expenses,
                };
            })
        );
    },[data]);

    const revenueProfit = useMemo(()=>{
        return(
            data &&
            data[0].monthlyData.map(({month, revenue, expenses})=>{
                return {
                    name: month.substring(0,3),
                    revenue: revenue,
                    profit: (revenue - expenses).toFixed(2),
                };
            })
        );
    },[data]);

    return (
        <>
        <DashboardBox gridArea="a">
            <BoxHeader 
                title="Revenue vs Expenses" 
                subtitle="Top line : Revenue & Bottom line : Expenses"
                 />
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={revenueExpenses}
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 60,
                }}
            >
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}}  />
                <YAxis 
                    tickLine={false}
                    axisLine={{ strokeWidth: "1" }}
                    style={{ fontSize: "10px" }}
                />
              <Legend />
                <Tooltip />
                <Area 
                type="monotone" 
                dataKey="revenue" dot={true} stackId="1" stroke={palette.primary.main} fill="url(#colorRevenue)" />
                <Area 
                type="monotone" 
                dataKey="expenses" dot={true} stackId="1" stroke={palette.primary.main} fill="url(#colorExpenses)" />
            </AreaChart>
            </ResponsiveContainer>
        </DashboardBox>

{/* second chart */}


        <DashboardBox gridArea="b">
        <BoxHeader 
                title="Profit and Revenue" 
                subtitle="Top line : Revenue & Bottom line : Profit"
                 />
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={400}
                data={revenueProfit}
                margin={{
                top: 20,
                right: 0,
                left: -10,
                bottom: 55,
                }}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} style={{fontSize: "10px"}}  />
                <YAxis 
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    style={{fontSize: "10px"}}/>
                <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    style={{fontSize: "10px"}}/>
                <Legend
                height={20}
                wrapperStyle={{
                    margin: "0 0 10px 0",
                }}
                />
                <Tooltip />
                <Line
                yAxisId="left"
                type="monotone"
                dataKey="profit"
                stroke={palette.tertiary[700]}
                />
                <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke={palette.primary.main}
                />
            </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
        {/* third graph */}

        <DashboardBox gridArea="c">
            <BoxHeader
            title="Revenue Month by Month"
            subtitle="Graph representing the revenue month by month"
            />
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={revenue}
                margin={{
                top: 17,
                right: 15,
                left: -5,
                bottom: 58,
                }}
            >
                <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.8}
                    />
                    <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0}
                    />
                </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
                />
                <YAxis
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
                />
                <Tooltip />
                <Bar dataKey="revenue" fill="url(#colorRevenue)" />
            </BarChart>
            </ResponsiveContainer>
        </DashboardBox>
        </>
    )
}

export default Row1