import { Card, Typography, Link, CardOverflow, CardContent, Button, AspectRatio } from '@mui/joy'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import { Box, Rating } from '@mui/material'
import Image from 'next/image'

interface IProductCard {
    name: string
    image: string
    price: number
    rating: number
    category: string
}

export default function ProductCard({
    name,
    image,
    category,
    price,
    rating,
}: IProductCard) {
    const addToCart = () => {
        console.log('item added to cart')
    }

    return (
        <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardOverflow>
                <AspectRatio sx={{ minWidth: 200 }}>
                    <Image
                        width={200}
                        height={200}
                        src={image}
                        priority={true}
                        alt={`Representação do produto ${name}`}
                    />
                </AspectRatio>
            </CardOverflow>
            <CardContent>
                <Typography level="body-xs">Produto em {category}</Typography>
                <Link
                    href="#product-card"
                    fontWeight="md"
                    color="neutral"
                    textColor="text.primary"
                    overlay
                    endDecorator={<ArrowOutwardIcon />}
                >
                    {name}
                </Link>

                <Typography
                    level="body-sm"
                    endDecorator={
                        <Rating
                            name="read-only"
                            value={rating}
                            readOnly
                            precision={0.1}
                            size="small"
                        />
                    }
                >
                    {rating}
                </Typography>

                <Box sx={{ display: 'flex', gap: '5px', alignItems: 'baseline' }}>
                    <Typography level="h3" sx={{ mt: 1, fontWeight: 'xl' }}>
                        R$ {price}
                    </Typography>
                    <Typography level="body-sm">à vista</Typography>
                </Box>
            </CardContent>
            <CardOverflow>
                <Button variant="solid" size="lg" onClick={addToCart}>
                    Add to cart
                </Button>
            </CardOverflow>
        </Card>
    )
}
