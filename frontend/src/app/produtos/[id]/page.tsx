type PageProps = {
    params: {
        id : string;
    }
}

export default async function ProdutoDetalhePage(props : PageProps)
{
    const {params} = await props;

    return <>
        <pre>
            {JSON.stringify(params, null, 2)}
        </pre>
        <h1>Produto Detalhe</h1>
    </>
}