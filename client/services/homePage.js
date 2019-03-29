export default async () => {
    const data = await import(/* webpackChunkName: 'HomePage' */ '../components/homePage');
    return data.default;
};