import React from 'react';

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            
            <div className="sdnode node-client" onDragStart={(event) => onDragStart(event, 'client')} draggable>
                <h1>Client</h1>
            </div>
            <div className="sdnode node-database" onDragStart={(event) => onDragStart(event, 'database')} draggable>
                <h1>Database</h1>
            </div>
            
            <div className="sdnode node-server" onDragStart={(event) => onDragStart(event, 'server')} draggable>
                <h1>Server</h1>
            </div>
            
            <div className="sdnode node-router" onDragStart={(event) => onDragStart(event, 'router')} draggable>
                <h1>Router</h1>
            </div>
            
            <div className="sdnode node-switch" onDragStart={(event) => onDragStart(event, 'switch')} draggable>
                <h1>Switch</h1>
            </div>
            
            <div className="sdnode node-loadBalancer" onDragStart={(event) => onDragStart(event, 'loadBalancer')} draggable>
                <h1>Load balancer</h1>
            </div>
        </aside>
    );
};