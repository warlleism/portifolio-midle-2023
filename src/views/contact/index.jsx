import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import './style.scss';
import imgContact from '../../assets/contact.png'
import imgContact2 from '../../assets/contact2.png'
import { useState } from 'react';

const schema = z.object({
    name: z.string().min(1, { message: 'Nome é obrigatório' }).max(255, { message: 'Nome deve ter no máximo 255 caracteres' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    description: z.string().max(500, { message: 'Descrição deve ter no máximo 500 caracteres' }).optional(),
});


const Contacts = () => {
    const onSubmit = (data) => console.log(data);
    const [img, setImg] = useState(0)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    setInterval(() => {
        setImg(prevImg => (prevImg === 0 ? 1 : 0));
    }, 3000);

    return (
        <div id="contacts">
            <div className='textTitle text'>Contato</div>
            <div className='main-contact-container'>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className='container-input'>
                        <div className='text-container'>Título:</div>
                        <input type='text' {...register('name')} />
                        {errors.name && <span style={{ color: '#0000006d', fontSize: '1rem' }}>{errors.name.message}</span>}
                    </div>

                    <div className='container-input' >
                        <div className='text-container'>Email:</div>
                        <input type='text' {...register('email')} />
                        {errors.email && <span style={{ color: '#0000006d', fontSize: '1rem' }}>{errors.email.message}</span>}
                    </div>

                    <div className='container-textarea'>
                        <div className='text-container'>Descrição:</div>
                        <textarea rows={10} {...register('description')} />
                        {errors.description && <span style={{ color: '#0000006d', fontSize: '1rem' }}>{errors.description.message}</span>}
                    </div>

                    <button type='submit'>
                        Enviar
                    </button>
                </form>
                <div className='container-img-content'>
                    <div className='container-img'
                        style={{ backgroundImage: `url(${img === 1 ? imgContact : imgContact2})` }}
                    >

                    </div>
                </div>

            </div>
        </div >
    );
};

export default Contacts;