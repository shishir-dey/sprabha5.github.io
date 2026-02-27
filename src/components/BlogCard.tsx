import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Stack, Chip, Box } from '@mui/material';

export interface BlogItem {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    excerpt?: string;
}

interface BlogCardProps {
    post: BlogItem;
    onClick: (slug: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
    return (
        <Card
            elevation={0}
            sx={{ height: '100%', width: '100%', minWidth: 0, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}
        >
            <CardActionArea
                onClick={() => onClick(post.slug)}
                sx={{ height: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <CardContent sx={{ flexGrow: 1, width: '100%', minWidth: 0 }}>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.3rem', sm: '1.5rem' }, overflowWrap: 'anywhere', wordBreak: 'break-word' }}
                    >
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle2" color="primary" display="block" sx={{ mb: 2, fontWeight: 500 }}>
                        {new Date(post.date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Typography>
                    {post.excerpt && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                            {post.excerpt}
                        </Typography>
                    )}
                    <Box sx={{ mt: 'auto' }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {post.tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        maxWidth: '100%',
                                        '& .MuiChip-label': {
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        },
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BlogCard;
