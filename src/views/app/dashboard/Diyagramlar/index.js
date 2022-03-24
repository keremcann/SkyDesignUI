import React, { useState, useRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    Background,
} from 'react-flow-renderer';
import Sidebar from './Sidebar';
import * as NodeType from './custom-components';
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

const Diyagramlar = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [elements, setElements] = useState([]);
    const onConnect = (params) => setElements((els) => addEdge(params, els));
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onLoad = (_reactFlowInstance) =>
        setReactFlowInstance(_reactFlowInstance);

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        let newNode = {
            id: getId(),
            type,
            position
        };

        switch (type) {
            case 'database':
                const dbName = prompt('Enter DB Name');
                newNode = {
                    ...newNode,
                    data: { label: dbName }
                }
                break;

            case 'client':
                const clientName = prompt('Enter client Name');

                if (!clientName) return;

                newNode = {
                    ...newNode,
                    data: { clientInfo: clientName }
                }
                break;

            default:

                break;
        }

        setElements((es) => es.concat(newNode));
    };

    return (
        <div className="dndflow">
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: '480px', borderStyle: "solid" }}>
                    <ReactFlow
                        elements={elements}
                        onConnect={onConnect}
                        onElementsRemove={onElementsRemove}
                        onLoad={onLoad}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        snapToGrid={true}
                        snapGrid={[10, 10]}
                        nodeTypes={nodeTypes}
                    >
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
                <Sidebar />
            </ReactFlowProvider>

            <button onClick={() => alert(JSON.stringify(elements))}>JSON</button>
            <button onClick={() => alert(JSON.stringify(_.last(_.map(_.map(elements, 'id'), _.toNumber))))}>JSON</button>
        </div>
    );
};

export default Diyagramlar;