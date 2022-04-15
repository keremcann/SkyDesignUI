import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import _ from "lodash";
import * as NodeType from '../custom-components';
import * as EdgeType from '../custom-edges';

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

const edgeTypes = {
    ownedBy: EdgeType.OwnedByEdge,
    managedBy: EdgeType.ManagedBy,
    maintedBy: EdgeType.MaintedBy,
    supportedBy: EdgeType.SupportedBy,
    usedBy: EdgeType.UsedBy,
    realizedBy: EdgeType.RealizedBy,
    executedBy: EdgeType.ExecutedBy
};

const AltyapiMimariDiyagram = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [selectedEdgeType, setSelectedEdgeType] = useState(null);

    const selectedEdge = useRef(null);

    const onConnect = useCallback((params) => {
        alert(JSON.stringify(params))
        alert(selectedEdgeType)
        alert(selectedEdge.current)
        alert(selectedEdge)
        setEdges((eds) => addEdge({ ...params, type: selectedEdge.current ?? 'smoothstep', animated: true }, eds))
    }, []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            console.log(event)

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            if (typeof type === 'undefined' || !type) {
                return;
            }

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

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );


    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="dndflow">
            <div>
                {JSON.stringify(nodes)}<br />
                {JSON.stringify(edges)}
            </div>
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: '540px', borderStyle: "solid", borderWidth: 'thin' }}>

                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        // fitView
                        snapToGrid={true}
                    >
                        <Controls />
                        <Background />
                        <aside style={{ position: 'absolute', right: 10, top: 30, zIndex: 4 }} className='component-list'>

                            {/* <div className="description item" style={{ fontSize: '14px', paddingRight: '14px' }}>Bu paneli kullanarak sürükle bırak işlemini gerçekleştirebilirsiniz.</div> */}

                            <div className="sdnode node-client item" onDragStart={(event) => onDragStart(event, 'client')} draggable>
                                <div>Client</div>
                                <img className='component-icon' src='/assets/img/component-images/client.png'></img>
                            </div>
                            <div className="sdnode node-database item" onDragStart={(event) => onDragStart(event, 'database')} draggable>
                                <div>Database</div>
                                <img className='component-icon' src='/assets/img/component-images/database.png'></img>
                            </div>

                            <div className="sdnode node-server item" onDragStart={(event) => onDragStart(event, 'server')} draggable>
                                <div>Server</div>
                                <img className='component-icon' src='/assets/img/component-images/server.png'></img>
                            </div>

                            <div className="sdnode node-router item" onDragStart={(event) => onDragStart(event, 'router')} draggable>
                                <div>Router</div>
                                <img className='component-icon' src='/assets/img/component-images/router.png'></img>
                            </div>

                            <div className="sdnode node-switch item" onDragStart={(event) => onDragStart(event, 'switch')} draggable>
                                <div>Switch</div>
                                <img className='component-icon' src='/assets/img/component-images/switch.png'></img>
                            </div>

                            <div className="sdnode node-loadBalancer item" onDragStart={(event) => onDragStart(event, 'loadBalancer')} draggable>
                                <div>Load balancer</div>
                                <img className='component-icon' src='/assets/img/component-images/load-balancer.png'></img>
                            </div>
                        </aside>


                        <aside style={{ position: 'absolute', right: 220, top: 30, zIndex: 4 }} className='component-list'>

                            <div className="sdnode node-client item" onClick={() => {
                                selectedEdge.current = 'ownedBy';
                                setSelectedEdgeType('ownedBy');
                                alert(selectedEdgeType)
                            }}>
                                <div>Owned By</div>
                                <img className='component-icon' src='/assets/img/lines/1.png'></img>
                            </div>
                            <div className="sdnode node-database item" onClick={() => {
                                alert('1')
                                setSelectedEdgeType('managedBy');
                            }}>
                                <div>Managed By</div>
                                <img className='component-icon' src='/assets/img/lines/2.png'></img>
                            </div>

                            <div className="sdnode node-server item" onClick={() => {
                                alert('1')
                                setSelectedEdgeType('maintedBy');
                            }}>
                                <div>Mainted By</div>
                                <img className='component-icon' src='/assets/img/lines/3.png'></img>
                            </div>

                            <div className="sdnode node-router item" onClick={() => {
                                alert('1')
                                setSelectedEdgeType('supportedBy');
                            }}>
                                <div>Supported By</div>
                                <img className='component-icon' src='/assets/img/lines/4.png'></img>
                            </div>

                            <div className="sdnode node-switch item" onClick={() => {
                                alert('1')
                                setSelectedEdgeType('usedBy');
                            }}>
                                <div>Used By</div>
                                <img className='component-icon' src='/assets/img/lines/5.png'></img>
                            </div>

                            <div className="sdnode node-loadBalancer item" onClick={() => {
                                alert('1')
                                setSelectedEdgeType('realizedBy');
                            }}>
                                <div>Realized By</div>
                                <img className='component-icon' src='/assets/img/lines/6.png'></img>
                            </div>


                            <div className="sdnode node-loadBalancer item" onClick={() => {
                                alert('1')
                                setSelectedEdgeType('executedBy');
                            }}>
                                <div>Executed By</div>
                                <img className='component-icon' src='/assets/img/lines/7.png'></img>
                            </div>
                        </aside>

                    </ReactFlow>

                    {/* <pre>
                {JSON.stringify(data, null, 4)}
            </pre> */}

                    {/* <button onClick={() => alert(JSON.stringify(_.last(_.map(_.map(elements, 'id'), _.toNumber))))}>JSON</button> */}
                </div>
                {/* <Sidebar /> */}
            </ReactFlowProvider >

        </div >
    );
};

export default AltyapiMimariDiyagram;