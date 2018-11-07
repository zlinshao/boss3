  //表格类型
  tableChartData = [
    {
      name:"中介费占业绩比最高的前100名员工",
      thData:[
        {
          label:'排名',
          prop:'rank'
        },
        {
          label:'片区',
          prop:'area'
        },
        {
          label:'业务员',
          prop:'name'
        },
        {
          label:'业绩金额',
          prop:'achieve'
        },
        {
          label:'中介费金额',
          prop:'agency'
        },
        {
          label:'中介费占业绩比',
          prop:'percent'
        },
      ]
    },
    {
      name:"异常单列表",
      thData:[
        {
          label:'片区',
          prop:'org_name'
        },
        {
          label:'片区经理',
          prop:'leader_name'
        },
        {
          label:'房屋地址',
          prop:'houses_name'
        },
        {
          label:'让价金额',
          prop:'excep_rent_price'
        }
      ]
    }
  ]

  //图表参数
  chartParams = {
    city: '',
    area: '',
    group:'',
    start_date:"",
    end_date:"",
    date:"",
  }

  
