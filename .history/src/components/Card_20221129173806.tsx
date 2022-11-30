import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type PokemonCardProps = {
  name: string
  url: string
}

type PokemonProps = {
  id: number
  name: string
  base_experience: number
  height: number
  order: number
  weight: number
  url: string
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState({} as PokemonProps)

  useEffect(() => {
    async function getPokemonData() {
      const res = await axios.get(url)
      const data = res.data
      // console.log(data)
      const poke = {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        order: data.order,
        weight: data.weight,
        url: data.sprites.front_default,
      }
      setPokemon(poke)
    }
    getPokemonData()
  }, [url])

  return (
    <Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

    
  )
}
