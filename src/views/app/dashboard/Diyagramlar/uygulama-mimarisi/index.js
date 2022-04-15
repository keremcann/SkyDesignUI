import React, { useState, useRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    // removeElements,
    Controls,
    Background,
} from 'react-flow-renderer';
import Sidebar from '../Sidebar';
import * as NodeType from '../custom-components';
import _ from "lodash";

let id = 0;
const getId = () => `${id++}`;

const nodeTypes = {
    client: NodeType.ClientNode,
    database: NodeType.DatabaseNode,
    server: NodeType.ServerNode,
    router: NodeType.RouterNode,
    switch: NodeType.SwitchNode,
    loadBalancer: NodeType.LoadBalancerNode,
};

const UygulamaMimariDiyagram = () => {
    // const reactFlowWrapper = useRef(null);
    // const [reactFlowInstance, setReactFlowInstance] = useState(null);
    // const [elements, setElements] = useState([]);
    // const onConnect = (params) => setElements((els) => addEdge(params, els));
    // const onElementsRemove = (elementsToRemove) =>
    //     setElements((els) => removeElements(elementsToRemove, els));

    // const onLoad = (_reactFlowInstance) =>
    //     setReactFlowInstance(_reactFlowInstance);

    // const onDragOver = (event) => {
    //     event.preventDefault();
    //     event.dataTransfer.dropEffect = 'move';
    // };

    // const onDragStart = (event, nodeType) => {
    //     event.dataTransfer.setData('application/reactflow', nodeType);
    //     event.dataTransfer.effectAllowed = 'move';
    // };

    // const onDrop = (event) => {
    //     event.preventDefault();

    //     const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    //     const type = event.dataTransfer.getData('application/reactflow');
    //     const position = reactFlowInstance.project({
    //         x: event.clientX - reactFlowBounds.left,
    //         y: event.clientY - reactFlowBounds.top,
    //     });

    //     let newNode = {
    //         id: getId(),
    //         type,
    //         position
    //     };

    //     switch (type) {
    //         case 'database':
    //             const dbName = prompt('Enter DB Name');
    //             newNode = {
    //                 ...newNode,
    //                 data: { label: dbName }
    //             }
    //             break;

    //         case 'client':
    //             const clientName = prompt('Enter client Name');

    //             if (!clientName) return;

    //             newNode = {
    //                 ...newNode,
    //                 data: { clientInfo: clientName }
    //             }
    //             break;

    //         default:

    //             break;
    //     }

    //     setElements((es) => es.concat(newNode));
    // };

    return (
        // <div className="dndflow">
        //     <ReactFlowProvider>
        //         <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: '540px', borderStyle: "solid", borderWidth: 'thin' }}>
        //             <ReactFlow
        //                 elements={elements}
        //                 onConnect={onConnect}
        //                 onElementsRemove={onElementsRemove}
        //                 onLoad={onLoad}
        //                 onDrop={onDrop}
        //                 onDragOver={onDragOver}
        //                 snapToGrid={true}
        //                 snapGrid={[10, 10]}
        //                 nodeTypes={nodeTypes}
        //                 style={{ background: 'white' }}
        //             >
        //                 <Controls />
        //                 <Background />
        //                 <aside style={{ position: 'absolute', right: 10, top: 30, zIndex: 4 }} className='component-list'>

        //                     {/* <div className="description item" style={{ fontSize: '14px', paddingRight: '14px' }}>Bu paneli kullanarak sürükle bırak işlemini gerçekleştirebilirsiniz.</div> */}

        //                     <div className="sdnode node-client item" onDragStart={(event) => onDragStart(event, 'client')} draggable>
        //                         <div>Client</div>
        //                         <img className='component-icon' src='/assets/img/component-images/client.png'></img>
        //                     </div>
        //                     <div className="sdnode node-database item" onDragStart={(event) => onDragStart(event, 'database')} draggable>
        //                         <div>Database</div>
        //                         <img className='component-icon' src='/assets/img/component-images/database.png'></img>
        //                     </div>

        //                     <div className="sdnode node-server item" onDragStart={(event) => onDragStart(event, 'server')} draggable>
        //                         <div>Server</div>
        //                         <img className='component-icon' src='/assets/img/component-images/server.png'></img>
        //                     </div>

        //                     <div className="sdnode node-router item" onDragStart={(event) => onDragStart(event, 'router')} draggable>
        //                         <div>Router</div>
        //                         <img className='component-icon' src='/assets/img/component-images/router.png'></img>
        //                     </div>

        //                     <div className="sdnode node-switch item" onDragStart={(event) => onDragStart(event, 'switch')} draggable>
        //                         <div>Switch</div>
        //                         <img className='component-icon' src='/assets/img/component-images/switch.png'></img>
        //                     </div>

        //                     <div className="sdnode node-loadBalancer item" onDragStart={(event) => onDragStart(event, 'loadBalancer')} draggable>
        //                         <div>Load balancer</div>
        //                         <img className='component-icon' src='/assets/img/component-images/load-balancer.png'></img>
        //                     </div>
        //                 </aside>

        //                 {/* <button onClick={() => alert(JSON.stringify(elements))}>JSON</button>
        //                 <button onClick={() => alert(JSON.stringify(_.last(_.map(_.map(elements, 'id'), _.toNumber))))}>JSON</button> */}
        //             </ReactFlow>
        //         </div>
        //         {/* <Sidebar /> */}
        //     </ReactFlowProvider>

        // </div>
        <>bla</>
    );
};

export default UygulamaMimariDiyagram;