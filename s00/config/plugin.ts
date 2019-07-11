import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  sofaRpc: {
    enable: true,
    package: 'egg--sofa-rpc',
  },
};

export default plugin;
