import { Button, Table, Alert, Container, Row, Col } from 'react-bootstrap'

export default function listaProdutosCarrinho(props) {

    function excluirProduto(produto){
        if(window.confirm("Deseja excluir o produto de codigo " + produto.id + " do seu carrinho?")){
            const novaListaCarrinho = props.listaProdutosCarrinho.filter(
                item => item.id !== produto.id
            );
            props.setListaProdutosCarrinho(novaListaCarrinho)
            localStorage.setItem('carrinho',JSON.stringify(novaListaCarrinho));
        }
    }

    function addProduto(produto) {
        const novaListaCarrinho = props.listaProdutosCarrinho.map(item => {
            if (item.id === produto.id) {
                return { ...item, quantidade: Number(item.quantidade) + 1 };
            }
            return item;
        })
        props.setListaProdutosCarrinho(novaListaCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novaListaCarrinho));
    }

    function lessProduto(produto) {
        const novaListaCarrinho = props.listaProdutosCarrinho.map(item => {
            if (item.id === produto.id && item.quantidade > 1) {
                return { ...item, quantidade: Number(item.quantidade) - 1 };
            }
            return item;
        })
        props.setListaProdutosCarrinho(novaListaCarrinho);
        localStorage.setItem('carrinho', JSON.stringify(novaListaCarrinho));
    }

    return (
        <Alert variant='dark'>
            <div>
                <Table striped bordered hover variant='dark'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Quantidade</th>
                            <th>Preco</th>
                            <th>SubTotal</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.listaProdutosCarrinho.map((produto, i) => {
                            return <tr key={i}>
                                <td>{produto.id}</td>
                                <td>{produto.titulo}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.quantidade}</td>
                                <td>{produto.preco}</td>
                                <td>{produto.quantidade * produto.preco}</td>
                                <td>
                                    {/*Ações*/}
                                    <Row>
                                        <Col xs={12} className="mb-2">
                                            <Button
                                                variant='outline-danger'
                                                className='mb-1'
                                                style={{ borderColor: 'white', width: '100%' }}
                                                onClick={()=>{excluirProduto(produto);}}
                                            >Excluir</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={6}>
                                            <Button
                                                variant='outline-success'
                                                className='mb-1'
                                                style={{ borderColor: 'white' }}
                                                onClick={()=>{addProduto(produto);}}
                                            >+</Button>
                                        </Col>
                                        <Col xs={6}>
                                            <Button
                                                variant='outline-warning'
                                                className='mb-1'
                                                style={{ borderColor: 'white' }}
                                                onClick={()=>{lessProduto(produto);}}
                                            >-</Button>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>

                <Container className='text-center'>
                    <Button variant='danger' style={{ borderColor: 'white' }} onClick={() => {
                        props.mostrarLista(false)
                    }}>Voltar</Button>
                </Container>
            </div>
        </Alert>
    );
}