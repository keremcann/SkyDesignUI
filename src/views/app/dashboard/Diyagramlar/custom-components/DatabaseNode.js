import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

const DatabaseNode = ({ data, isConnectable }) => {
    return (
        <>
            <Handle
                type="target"
                position="left"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div>
                Database<br></br>({data.label})
            </div>

            <Handle
                type="source"
                position="right"
                id="a"
                style={{ top: 10, background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                id="b"
                style={{ bottom: 10, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                id="c"
                style={{ bottom: 15, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                id="d"
                style={{ bottom: 20, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position="right"
                id="e"
                style={{ bottom: 25, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    );
};

export default memo(DatabaseNode);