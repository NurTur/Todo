export default async () => {
    const data = await import(/* webpackChunkName: 'AuthPage' */ '../container/authenticateClass');
    return data.default;
};