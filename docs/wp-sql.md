
## GET POST

```sql

# get post IDs

SELECT SQL_CALC_FOUND_ROWS wp_posts.ID
FROM wp_posts 
WHERE 1=1 
AND wp_posts.post_type = 'post'
AND (wp_posts.post_status = 'publish'
OR wp_posts.post_status = 'private') 
ORDER BY wp_posts.post_date DESC
LIMIT 0, 10


# get posts

SELECT wp_posts.*
FROM wp_posts
WHERE ID IN (id,id,id)


```

