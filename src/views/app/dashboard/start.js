import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row } from 'reactstrap';
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
import SkyTable from '../../../app/utils/SkyTable/SkyTable';
import SkyTableColumnBuilder from '../../../app/utils/SkyTable/SkyTableColumnBuilder';


const columns = (products) => [
  new ColumnBuilder('id', 'Product ID').isIdField().sortable().withTextFilter(true).build(),
  new ColumnBuilder('name', 'Product name').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('price', 'New Pricess').sortable().withTextFilter().build(),
  new ColumnBuilder('random1', 'Random 1').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random2', 'Random 2').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random3', 'Random 3').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random4', 'Random 4').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random5', 'Random 5').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random6', 'Random 6').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random7', 'Random 7').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random8', 'Random 8').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random9', 'Random 9').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random10', 'Random 10').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random11', 'Random 11').sortable().withSelectFilter(products).build(),
  new ColumnBuilder('random12', 'Random 12').sortable().withSelectFilter(products)
    .withFormat((cell) =>
      cell.includes('a')
        ? <div style={{ color: 'red' }}>{cell}</div>
        : <div>{cell}</div>).build(),
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
    <Row>
      <Colxx className="mb-12">

        <Card className="mb-4">
          <CardBody>
            <CardTitle>
              SOME DATA
            </CardTitle>
            {
              <SkyTable columns={[
                new SkyTableColumnBuilder('id', "IDS HERE").withNumberRangeFilter().withFormat(({ row }) =>
                  <button onClick={() => {
                    alert(JSON.stringify(row.original))
                  }}>{row.original.id}</button>
                ).build(),
                new SkyTableColumnBuilder('random1', "RANDOMMMM~!!").withTextFilter().build(),
                new SkyTableColumnBuilder('random2', "RANDOMMMM 2 ~!!").withTextFilter(true).build(),
                {
                  Header: 'Some custom stuff here',
                  Cell: ({ row }) => {
                    return <button onClick={() => {
                      alert(JSON.stringify(row.original))
                    }}>Click</button>;
                  }
                },
                new SkyTableColumnBuilder('random3', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random4', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random5', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random6', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random7', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random8', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random9', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random10', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random11', 'Random 3').withSelectFilter().build(),
                new SkyTableColumnBuilder('random12', 'Random 3').withSelectFilter().build(),
              ]}
                data={products} />
            }
            {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> :
              (<BootstrapTable
                keyField='id'
                data={products}
                columns={columns(products)}
                filter={filterFactory()}
                pagination={paginationFactory()} />
              )}
          </CardBody>
        </Card>

      </Colxx>
    </Row>
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