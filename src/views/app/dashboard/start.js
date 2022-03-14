import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  Background,
} from 'react-flow-renderer';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import ChartCard from './ChartCard';
import Doughnut from './doughnut';
import Calendar from './Calendar';
import Users from './Users';

const Start = () => {
  return <>
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