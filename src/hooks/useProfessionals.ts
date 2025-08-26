import { useState, useEffect } from 'react'
import { getProfessionals } from '../lib/supabase'

export const useProfessionals = () => {
  const [professionals, setProfessionals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setLoading(true)
        const { data, error } = await getProfessionals()
        
        if (error) {
          setError(error.message)
          return
        }
        
        // Transform database data to match UI expectations
        const transformedData = data.map((prof: any) => {
          const profile = prof.professional_profiles
          const services = prof.services || []
          const availability = prof.availability || []
          
          // Convert day_of_week numbers to day names
          const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          const availableDays = availability
            .filter((avail: any) => avail.is_available)
            .map((avail: any) => dayNames[avail.day_of_week])
          
          return {
            id: prof.id,
            name: prof.full_name,
            title: profile?.title || 'Professional',
            specializations: profile?.specializations || [],
            rating: profile?.rating || 0,
            reviewCount: profile?.review_count || 0,
            experience: profile?.experience_years || 0,
            location: prof.address || 'Location not specified',
            avatar: prof.avatar_url || 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
            hourlyRate: profile?.hourly_rate || 0,
            availability: availableDays,
            bio: profile?.bio || 'No bio available',
            credentials: profile?.credentials || [],
            languages: profile?.languages || ['English'],
            isVerified: profile?.is_verified || false,
            responseTime: profile?.average_response_time ? `${Math.floor(profile.average_response_time / 60)} hours` : '24 hours',
            completionRate: profile?.completion_rate || 0,
            totalSessions: profile?.total_sessions || 0,
            services: services.filter((service: any) => service.is_active).map((service: any) => ({
              id: service.id,
              name: service.name,
              description: service.description,
              duration: service.duration,
              rate: service.rate,
              type: service.category?.toLowerCase() || 'therapy'
            }))
          }
        })
        
        setProfessionals(transformedData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProfessionals()
  }, [])

  return { 
    professionals, 
    loading, 
    error, 
    refetch: () => {
      const fetchProfessionals = async () => {
        const { data } = await getProfessionals()
        if (data) {
          // Transform and set data (same logic as above)
          const transformedData = data.map((prof: any) => {
            const profile = prof.professional_profiles
            const services = prof.services || []
            const availability = prof.availability || []
            
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const availableDays = availability
              .filter((avail: any) => avail.is_available)
              .map((avail: any) => dayNames[avail.day_of_week])
            
            return {
              id: prof.id,
              name: prof.full_name,
              title: profile?.title || 'Professional',
              specializations: profile?.specializations || [],
              rating: profile?.rating || 0,
              reviewCount: profile?.review_count || 0,
              experience: profile?.experience_years || 0,
              location: prof.address || 'Location not specified',
              avatar: prof.avatar_url || 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400',
              hourlyRate: profile?.hourly_rate || 0,
              availability: availableDays,
              bio: profile?.bio || 'No bio available',
              credentials: profile?.credentials || [],
              languages: profile?.languages || ['English'],
              isVerified: profile?.is_verified || false,
              responseTime: profile?.average_response_time ? `${Math.floor(profile.average_response_time / 60)} hours` : '24 hours',
              completionRate: profile?.completion_rate || 0,
              totalSessions: profile?.total_sessions || 0,
              services: services.filter((service: any) => service.is_active).map((service: any) => ({
                id: service.id,
                name: service.name,
                description: service.description,
                duration: service.duration,
                rate: service.rate,
                type: service.category?.toLowerCase() || 'therapy'
              }))
            }
          })
          setProfessionals(transformedData)
        }
      }
      fetchProfessionals()
    }
  }
}