import Image from 'next/image'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { api } from '../../lib/axios'

interface PokemonProps {
  id: number
  name: string
  base_experience: number
  height: number
  weight: number
  order: number
  types: [{ type: { name: string } }]
  abilities: [{ ability: { name: string } }]
  sprites: { front_default: string }
}

export default function Pokemon() {
  const { query } = useRouter()
  const { data: pokemon, isSuccess } = useQuery<PokemonProps>(
    ['pokemon', query.id],
    async () => {
      const { data } = await api.get(`pokemon/${query.id}`)
      return data
    },
    {
      enabled: !!query.id,
    },
  )
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-2/3 max-w-md rounded-xl bg-white shadow-2xl border border-gray-500 fixed top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
      <div className="flex flex-col gap-4">
        {isSuccess && (
          <Image
            alt="image pokemon"
            src={pokemon?.sprites.front_default}
            width={150}
            height={100}
          />
        )}
        <div className="flex justify-between">
          {pokemon?.types.map(({ type }) => (
            <div
              key={type.name}
              className="py-2 px-3 text-center text-white bg-blue-600 rounded"
            >
              {type.name}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 bg-purple-500 px-14 py-6 w-full h-full rounded-t-3xl sm:grid-cols-2 md:grid-cols-3">
        <div>
          <div className="flex flex-col text-white">
            Height
            <p className="text-gray-300">{pokemon?.height}</p>
          </div>
          <div className="flex flex-col text-white">
            Weight
            <p className="text-gray-300">{pokemon?.weight}</p>
          </div>
          <div className="flex flex-col text-white">
            Order
            <p className="text-gray-300">{pokemon?.order}</p>
          </div>
        </div>
        <div>
          <div className="flex flex-col text-white">
            Base Exp.
            <p className="text-gray-300">{pokemon?.base_experience}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-white">
          <p className="font-semibold">Abilities</p>
          {pokemon?.abilities.map(({ ability }) => (
            <p
              key={ability.name}
              className="bg-green-500 px-2 py-1 w-full max-w-[10rem] rounded text-center"
            >
              {ability.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
