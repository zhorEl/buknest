import { useState, useEffect } from 'react'
import { 
  getInterventionCategories, 
  getInterventions, 
  getChildInterventions,
  InterventionCategory,
  Intervention,
  ChildIntervention
} from '../lib/supabase'

export const useInterventionCategories = () => {
  const [categories, setCategories] = useState<InterventionCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const { data, error } = await getInterventionCategories()
        
        if (error) {
          setError(error.message)
          return
        }
        
        setCategories(data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return { categories, loading, error }
}

export const useInterventions = (categoryId?: string) => {
  const [interventions, setInterventions] = useState<Intervention[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInterventions = async () => {
      try {
        setLoading(true)
        const { data, error } = await getInterventions(categoryId)
        
        if (error) {
          setError(error.message)
          return
        }
        
        setInterventions(data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchInterventions()
  }, [categoryId])

  return { interventions, loading, error, refetch: () => {
    const fetchInterventions = async () => {
      const { data } = await getInterventions(categoryId)
      setInterventions(data || [])
    }
    fetchInterventions()
  }}
}

export const useChildInterventions = (childId: string | null) => {
  const [childInterventions, setChildInterventions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!childId) {
      setChildInterventions([])
      setLoading(false)
      return
    }

    const fetchChildInterventions = async () => {
      try {
        setLoading(true)
        const { data, error } = await getChildInterventions(childId)
        
        if (error) {
          setError(error.message)
          return
        }
        
        setChildInterventions(data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchChildInterventions()
  }, [childId])

  return { 
    childInterventions, 
    loading, 
    error, 
    refetch: () => {
      if (childId) {
        const fetchChildInterventions = async () => {
          const { data } = await getChildInterventions(childId)
          setChildInterventions(data || [])
        }
        fetchChildInterventions()
      }
    }
  }
}