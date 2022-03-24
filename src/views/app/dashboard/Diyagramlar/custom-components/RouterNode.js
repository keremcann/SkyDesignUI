import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

const RouterNode = ({ data, isConnectable }) => {
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
                Router
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
                position="bottom"
                id="a"
                style={{ left: 30, background: '#555' }}
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
                style={{ top: 30, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            />
        </>
    );
};

export default memo(RouterNode);