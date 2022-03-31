import React, { useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import ChartCard from './ChartCard';
import Doughnut from './doughnut';
import Calendar from './Calendar';
import Users from './Users';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import _ from 'lodash';
import { ColumnBuilder } from '../../../app/utils/ColumnBuilder';
// import products from './datas';
import axios from 'axios';


const columns = (products) => [
  new ColumnBuilder('id', 'Product ID').isIdField().sortable().withTextFilter(true).build(),
  new ColumnBuilder('name', 'Product name').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('price', 'New Pricess').sortable().withTextFilter(true).build(),
  new ColumnBuilder('action', 'Looks good').isDummyField().withFormat((cell, row, rowIndex) => (
    <>
      <button onClick={() => {
        alert('cell: ' + JSON.stringify(cell))
        alert('row: ' + JSON.stringify(row))
        alert('index: ' + JSON.stringify(rowIndex))
      }}>Click here</button>
    </>
  )).build(),
];

const Start = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getData = async () => {
      setLoading(true);
      setProducts(await (await axios.get('http://localhost:18202/main/getallproducts')).data);
      setLoading(false);
    };

    getData();

  }, []);

  return <>
    {loading ? <h1>Loading...</h1> :
      (<div>
        <BootstrapTable
          keyField='id'
          data={products}
          columns={columns(products)}
          filter={filterFactory()}
          pagination={paginationFactory()} />
      </div>)}
    <Row>
      <Colxx lg="4" md="6" className="mb-4">
        <GradientWithRadialProgressCard
          icon="iconsminds-clock"
          title={`5 ${'posts'}`}
          detail={'details'}
          percent={(5 * 100) / 12}
          progressText="5/12"
        />
      </Colxx>
      <Colxx lg="4" md="6" className="mb-4">
        <GradientWithRadialProgressCard
          icon="iconsminds-male"
          title={`4`}
          detail={'process'}
          percent={(4 * 100) / 6}
          progressText="4/6"
        />
      </Colxx>
      <Colxx lg="4" md="6" className="mb-4">
        <GradientWithRadialProgressCard
          icon="iconsminds-bell"
          title={`8 alerts`}
          detail={'notice'}
          percent={(8 * 100) / 10}
          progressText="8/10"
        />
      </Colxx>
    </Row>
    <Row>
      <Colxx xxs="8" className="mb-4">
        <ChartCard />
      </Colxx>
      <Colxx xxs="4" className="mb-4">
        <Doughnut />
      </Colxx>

    </Row>
    <Row>
      <Colxx xl="6" lg="12" className="mb-4">
        <Calendar />
      </Colxx>
      <Colxx xl="6" lg="12" className="mb-4">
        <Users />
      </Colxx>
    </Row>
  </>
};

export default Start;