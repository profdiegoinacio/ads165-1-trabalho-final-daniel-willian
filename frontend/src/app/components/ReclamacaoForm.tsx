import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ReclamacaoForm: React.FC = () => {
    const [form, setForm] = useState({
        cep: '',
        endereco: '',
        bairro: '',
        numero: '',
        detalhes: '',
        usuarioId: '',
    });

    const router = useRouter();

    useEffect(() => {
        const email = localStorage.getItem('email');

        if (!email) {
            alert('Usuário não logado');
            router.push('/login');
            return;
        }

        axios.get(`http://localhost:8080/usuarios/email/${email}`)
            .then(response => {
                setForm(prev => ({
                    ...prev,
                    usuarioId: response.data.id
                }));
            })
            .catch(error => {
                console.error('Erro ao buscar usuário:', error);
                alert('Erro ao carregar dados do usuário.');
                router.push('/login');
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const fullEndereco = `${form.endereco}, Nº ${form.numero}, Bairro ${form.bairro}, CEP ${form.cep}`;
            const reclamacaoPayload = {
                endereco: fullEndereco,
                detalhes: form.detalhes,
                usuario: { id: form.usuarioId },
            };

            await axios.post('http://localhost:8080/reclamacoes', reclamacaoPayload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            alert('Reclamação enviada com sucesso!');
            setForm({ cep: '', endereco: '', bairro: '', numero: '', detalhes: '', usuarioId: form.usuarioId });
        } catch (error) {
            alert('Erro ao enviar reclamação');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
            <h2 className="text-xl font-semibold">Insira as informações para criar seu relato.</h2>

            {/* Campo de usuarioId removido, pois agora é automático */}

            <input
                type="text"
                name="cep"
                placeholder="Digite seu CEP"
                value={form.cep}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <input
                type="text"
                name="endereco"
                placeholder="Endereço"
                value={form.endereco}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
            />

            <div className="flex gap-4">
                <input
                    type="text"
                    name="bairro"
                    placeholder="Bairro"
                    value={form.bairro}
                    onChange={handleChange}
                    className="flex-1 p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="numero"
                    placeholder="Número"
                    value={form.numero}
                    onChange={handleChange}
                    className="w-24 p-2 border rounded"
                    required
                />
            </div>

            <textarea
                name="detalhes"
                placeholder="Descreva brevemente seu problema."
                value={form.detalhes}
                onChange={handleChange}
                className="w-full p-2 border rounded h-32"
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 rounded font-semibold hover:bg-blue-700"
            >
                Enviar Relato
            </button>
        </form>
    );
};

export default ReclamacaoForm;
