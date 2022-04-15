import React, { memo } from 'react';

import { Handle, Position } from 'react-flow-renderer';

const ClientNode = ({ data, isConnectable }) => {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="d"
                style={{ left: 10, background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="b"
                style={{ bottom: 10, top: 'auto', background: 'red', width: '6px', borderRadius: '0 4px 4px 0' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ top: 30, background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    );
};

export default memo(ClientNode);