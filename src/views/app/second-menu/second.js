import React, { useState } from 'react';
import { Row, Button } from 'reactstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import SkyModal from '../../../components/common/SkyModal';
import { observer } from 'mobx-react-lite';
import { useStore } from './../../../app/stores/store';

const Second = observer(({ match }) => {
  const [addModal, setAddModal] = useState(true);

  const { modalStore } = useStore();

  const sendRequest = (e) => {
    console.log(e.target)
  }
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.second" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
            New Button
            <button onClick={() => modalStore.openModal(<><p>Deneme</p></>)}>Click</button>
          </p>
          <p>
            <IntlMessages id="menu.second" />
          </p>
          <p>
            <button onClick={() => setAddModal(!addModal)}>Click</button>
          </p>
          <p>

            <SkyModal
              modalOpen={addModal}
              toggleModal={() => setAddModal(!addModal)}
              onFormSubmit={(e) => { console.log(e.target.elements) }}
              closeSubmit={true}
            >
              <form>
                <p>Sample data here.............</p>
                <input type='input' name='data'></input>
              </form>
            </SkyModal>
          </p>
        </Colxx>
      </Row>
    </>
  )
});
export default Second;
