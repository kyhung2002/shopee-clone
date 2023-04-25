import React from 'react'

const ProductRating = ({ rating }: { rating: number }) => {
  const handleRating = (currentIndex: number) => {
    if (currentIndex <= rating) {
      return '100%'
    }
    if (currentIndex > rating && currentIndex - rating < 1) {
      return (rating - Math.floor(rating)) * 100 + '%'
    }
    return '0%'
  }
  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div className='relative h-3 w-3' key={index}>
            <div className='absolute left-0 top-0 h-full overflow-hidden' style={{ width: handleRating(index + 1) }}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='h-full fill-yellow-300'
              >
                <path
                  fillRule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-3 w-3 fill-current text-gray-300'
            >
              <path
                fillRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        ))}
    </div>
  )
}

export default ProductRating
