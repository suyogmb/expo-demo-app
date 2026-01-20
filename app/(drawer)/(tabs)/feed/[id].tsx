import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Types
type SortOption = 'newest' | 'oldest' | 'popular';
type FilterOption = 'all' | 'images' | 'videos' | 'text';

interface Comment {
    id: number;
    text: string;
    type: 'text' | 'images' | 'videos';
    timestamp: Date;
    likes: number;
}

export default function FeedDetailScreen() {
    const router = useRouter();
    
    // Extract route params including filter and sort options
    const params = useLocalSearchParams<{
        id: string;
        sort?: SortOption;
        filter?: FilterOption;
        page?: string;
    }>();

    // Parse params with defaults
    const { id } = params;
    const sortBy = (params.sort || 'newest') as SortOption;
    const filterBy = (params.filter || 'all') as FilterOption;
    const currentPage = parseInt(params.page || '1', 10);

    // Mock data - in real app, fetch from API based on params
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        // Simulate fetching comments based on filters
        const mockComments: Comment[] = [
            { id: 1, text: 'Great post!', type: 'text', timestamp: new Date('2024-01-10'), likes: 15 },
            { id: 2, text: 'Check out these images', type: 'images', timestamp: new Date('2024-01-12'), likes: 23 },
            { id: 3, text: 'Amazing video content', type: 'videos', timestamp: new Date('2024-01-11'), likes: 45 },
            { id: 4, text: 'I love this!', type: 'text', timestamp: new Date('2024-01-13'), likes: 8 },
            { id: 5, text: 'More images here', type: 'images', timestamp: new Date('2024-01-09'), likes: 67 },
        ];

        let filtered = mockComments;

        // Apply filter
        if (filterBy !== 'all') {
            filtered = filtered.filter(comment => comment.type === filterBy);
        }

        // Apply sort
        filtered.sort((a, b) => {
            if (sortBy === 'newest') return b.timestamp.getTime() - a.timestamp.getTime();
            if (sortBy === 'oldest') return a.timestamp.getTime() - b.timestamp.getTime();
            if (sortBy === 'popular') return b.likes - a.likes;
            return 0;
        });

        setComments(filtered);
    }, [id, sortBy, filterBy, currentPage]);

    // Update URL with new filter/sort params
    const updateParams = (newSort?: SortOption, newFilter?: FilterOption, newPage?: number) => {
        router.setParams({
            sort: newSort || sortBy,
            filter: newFilter || filterBy,
            page: String(newPage || currentPage),
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Post Details</Text>
                <Text style={styles.subtitle}>Post ID: {id}</Text>
            </View>

            {/* Sort Options */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sort By:</Text>
                <View style={styles.optionsRow}>
                    {(['newest', 'oldest', 'popular'] as SortOption[]).map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.optionButton, sortBy === option && styles.activeButton]}
                            onPress={() => updateParams(option, undefined, undefined)}
                        >
                            <Text style={[styles.optionText, sortBy === option && styles.activeText]}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Filter Options */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Filter By:</Text>
                <View style={styles.optionsRow}>
                    {(['all', 'images', 'videos', 'text'] as FilterOption[]).map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[styles.optionButton, filterBy === option && styles.activeButton]}
                            onPress={() => updateParams(undefined, option, undefined)}
                        >
                            <Text style={[styles.optionText, filterBy === option && styles.activeText]}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Current Params Display */}
            {/* <View style={styles.paramsDisplay}>
                <Text style={styles.paramsText}>
                    Active Params: sort={sortBy}, filter={filterBy}, page={currentPage}
                </Text>
            </View> */}

            {/* Comments List */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
                {comments.map((comment) => (
                    <View key={comment.id} style={styles.commentCard}>
                        <View style={styles.commentHeader}>
                            <Text style={styles.commentType}>{comment.type}</Text>
                            <Text style={styles.commentLikes}>❤️ {comment.likes}</Text>
                        </View>
                        <Text style={styles.commentText}>{comment.text}</Text>
                        <Text style={styles.commentDate}>
                            {comment.timestamp.toLocaleDateString()}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Pagination */}
            <View style={styles.pagination}>
                <TouchableOpacity
                    style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
                    onPress={() => updateParams(undefined, undefined, currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Text style={styles.pageButtonText}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageNumber}>Page {currentPage}</Text>
                <TouchableOpacity
                    style={styles.pageButton}
                    onPress={() => updateParams(undefined, undefined, currentPage + 1)}
                >
                    <Text style={styles.pageButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        backgroundColor: '#fff',
        padding: 15,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    optionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    activeButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    activeText: {
        color: '#fff',
    },
    paramsDisplay: {
        backgroundColor: '#fff3cd',
        padding: 12,
        marginTop: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#ffc107',
    },
    paramsText: {
        fontSize: 13,
        color: '#856404',
        fontFamily: 'monospace',
    },
    commentCard: {
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    commentType: {
        fontSize: 12,
        color: '#007AFF',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    commentLikes: {
        fontSize: 12,
        color: '#666',
    },
    commentText: {
        fontSize: 15,
        color: '#333',
        marginBottom: 6,
    },
    commentDate: {
        fontSize: 12,
        color: '#999',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 10,
        marginBottom: 20,
    },
    pageButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#007AFF',
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    pageButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    pageNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
});
