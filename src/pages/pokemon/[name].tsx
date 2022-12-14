import { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../../lib/axios'

interface PokemonProps {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  types: [{ type: { name: string } }]
  abilities: [{ ability: { name: string } }]
  sprites: { front_default: string }
}

export default function Pokemon({ name }: PokemonProps) {
  return (
    <div>{name}</div>
    // <div className="flex flex-col items-center justify-center gap-8 w-2/3 max-w-md rounded-xl bg-white shadow-2xl border border-gray-500 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
    //   <div className="flex flex-col gap-4">
    //     <Image alt="image pokemon" src={} width={150} height={100} />
    //     <div className="flex justify-between">
    //       {types?.map((item) => (
    //         <div
    //           key={item}
    //           className="py-2 px-3 text-center text-white bg-blue-600 rounded"
    //         >
    //           {item}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-1 gap-2 bg-purple-500 px-14 py-6 w-full h-full rounded-t-3xl sm:grid-cols-2 md:grid-cols-3">
    //     <div>
    //       <div className="flex flex-col text-white">
    //         Height
    //         <p className="text-gray-300">{height}</p>
    //       </div>
    //       <div className="flex flex-col text-white">
    //         Weight
    //         <p className="text-gray-300">{weight}</p>
    //       </div>
    //       <div className="flex flex-col text-white">
    //         Order
    //         <p className="text-gray-300">{order}</p>
    //       </div>
    //     </div>
    //     <div>
    //       <div className="flex flex-col text-white">
    //         Base Exp.
    //         <p className="text-gray-300">{base_experience}</p>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-2 text-white">
    //       <p className="font-semibold">Abilities</p>
    //       {map((item) => (
    //         <p
    //           key={item}
    //           className="bg-green-500 px-2 py-1 w-full max-w-[10rem] rounded text-center"
    //         >
    //           {item}
    //         </p>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { name: string }> = async ({
  params,
}) => {
  const pokemonName = params?.name

  const pokemon = await api.get(`pokemon/${pokemonName}`)
  const teste = JSON.stringify(pokemon.data)
  console.log(teste)

  return {
    props: {},
    revalidate: 60 * 60 * 10, // 10 horas
  }
}
