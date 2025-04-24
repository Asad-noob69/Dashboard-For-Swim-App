import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tab,
  Tabs,
  Divider,
  LinearProgress,
  Menu,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// Mock data for media files
const mockMediaData = [
  {
    id: 'm1',
    type: 'image',
    title: 'Swimming Class Group Photo',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming',
    dateAdded: '2025-03-15',
    fileSize: '2.4 MB',
    tags: ['class', 'students', 'group'],
    category: 'classes',
  },
  {
    id: 'm2',
    type: 'image',
    title: 'Swimming Competition',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-competition',
    dateAdded: '2025-03-10',
    fileSize: '3.1 MB',
    tags: ['competition', 'event'],
    category: 'events',
  },
  {
    id: 'm3',
    type: 'image',
    title: 'Facility Overview',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-pool',
    dateAdded: '2025-02-20',
    fileSize: '4.2 MB',
    tags: ['facility', 'pool'],
    category: 'facility',
  },
  {
    id: 'm4',
    type: 'video',
    title: 'Swimming Technique Tutorial',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimmer',
    dateAdded: '2025-03-05',
    fileSize: '24.8 MB',
    duration: '3:45',
    tags: ['tutorial', 'technique', 'training'],
    category: 'tutorials',
  },
  {
    id: 'm5',
    type: 'image',
    title: 'Student Achievement',
    thumbnail: 'https://source.unsplash.com/random/800x600/?trophy',
    dateAdded: '2025-03-18',
    fileSize: '1.8 MB',
    tags: ['achievement', 'award', 'student'],
    category: 'achievements',
  },
  {
    id: 'm6',
    type: 'video',
    title: 'Annual Swimming Gala',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-race',
    dateAdded: '2025-02-28',
    fileSize: '52.4 MB',
    duration: '8:12',
    tags: ['event', 'gala', 'competition'],
    category: 'events',
  },
  {
    id: 'm7',
    type: 'image',
    title: 'New Pool Equipment',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-equipment',
    dateAdded: '2025-03-20',
    fileSize: '3.5 MB',
    tags: ['equipment', 'facility'],
    category: 'facility',
  },
  {
    id: 'm8',
    type: 'image',
    title: 'Instructor Team Photo',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-coach',
    dateAdded: '2025-03-12',
    fileSize: '2.9 MB',
    tags: ['staff', 'instructors', 'team'],
    category: 'staff',
  },
  {
    id: 'm9',
    type: 'video',
    title: 'Beginner Swimming Lesson',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-lesson',
    dateAdded: '2025-03-01',
    fileSize: '35.6 MB',
    duration: '5:20',
    tags: ['lesson', 'beginner', 'tutorial'],
    category: 'tutorials',
  },
  {
    id: 'm10',
    type: 'image',
    title: 'Parent Orientation Day',
    thumbnail: 'https://source.unsplash.com/random/800x600/?meeting',
    dateAdded: '2025-03-25',
    fileSize: '2.2 MB',
    tags: ['parents', 'orientation', 'event'],
    category: 'events',
  },
  {
    id: 'm11',
    type: 'image',
    title: 'Water Safety Poster',
    thumbnail: 'https://source.unsplash.com/random/800x600/?safety',
    dateAdded: '2025-03-22',
    fileSize: '1.5 MB',
    tags: ['safety', 'poster', 'information'],
    category: 'materials',
  },
  {
    id: 'm12',
    type: 'video',
    title: 'Advanced Swimming Techniques',
    thumbnail: 'https://source.unsplash.com/random/800x600/?swimming-stroke',
    dateAdded: '2025-03-08',
    fileSize: '42.3 MB',
    duration: '6:18',
    tags: ['advanced', 'technique', 'tutorial'],
    category: 'tutorials',
  },
];

// Interface for TabPanel props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`media-tabpanel-${index}`}
      aria-labelledby={`media-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `media-tab-${index}`,
    'aria-controls': `media-tabpanel-${index}`,
  };
}

const MediaGallery = () => {
  // State for tabs, search, and filters
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
  });
  const [sortOption, setSortOption] = useState('newest');
  
  // State for upload dialog
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  
  // Dialog state for media details/preview
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState<any>(null);

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // Handle media selection
  const handleMediaSelect = (mediaId: string) => {
    if (selectedMedia.includes(mediaId)) {
      setSelectedMedia(selectedMedia.filter(id => id !== mediaId));
    } else {
      setSelectedMedia([...selectedMedia, mediaId]);
    }
  };

  // Handle media preview
  const handlePreviewMedia = (media: any) => {
    setPreviewMedia(media);
    setPreviewDialogOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Filter media items based on search term and filters
  const filteredMedia = mockMediaData.filter(media => {
    // Apply search term filter
    if (searchTerm && !media.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !media.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Apply type filter
    if (filters.type && media.type !== filters.type) {
      return false;
    }
    
    // Apply category filter
    if (filters.category && media.category !== filters.category) {
      return false;
    }
    
    // Apply tab filters
    if (tabValue === 1 && media.type !== 'image') {
      return false;
    }
    if (tabValue === 2 && media.type !== 'video') {
      return false;
    }
    
    return true;
  });

  // Sort media items based on selected sort option
  const sortedMedia = [...filteredMedia].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'oldest':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Handle upload dialog close
  const handleUploadDialogClose = () => {
    if (!isUploading) {
      setUploadDialogOpen(false);
      setUploadProgress(0);
    }
  };

  // Simulate file upload
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            handleUploadDialogClose();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Media Gallery</Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<UploadIcon />}
            onClick={() => setUploadDialogOpen(true)}
          >
            Upload Media
          </Button>
        </Box>
      </Box>

      {/* Search and Filter Bar */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search media..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
          </Grid>
          <Grid item xs>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="newest">Newest</MenuItem>
                  <MenuItem value="oldest">Oldest</MenuItem>
                  <MenuItem value="alphabetical">A-Z</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        {/* Filter options */}
        {showFilters && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Media Type</InputLabel>
                  <Select
                    value={filters.type}
                    label="Media Type"
                    onChange={(e) => setFilters({...filters, type: e.target.value as string})}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    <MenuItem value="image">Images</MenuItem>
                    <MenuItem value="video">Videos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={filters.category}
                    label="Category"
                    onChange={(e) => setFilters({...filters, category: e.target.value as string})}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    <MenuItem value="classes">Classes</MenuItem>
                    <MenuItem value="events">Events</MenuItem>
                    <MenuItem value="facility">Facility</MenuItem>
                    <MenuItem value="tutorials">Tutorials</MenuItem>
                    <MenuItem value="achievements">Achievements</MenuItem>
                    <MenuItem value="staff">Staff</MenuItem>
                    <MenuItem value="materials">Materials</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => setFilters({ type: '', category: '' })}
                  sx={{ mr: 1 }}
                >
                  Clear Filters
                </Button>
                <Box>
                  {Object.values(filters).filter(Boolean).length > 0 && (
                    <Chip 
                      label={`${Object.values(filters).filter(Boolean).length} filters applied`} 
                      color="primary" 
                      size="small" 
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {/* Action bar for selected items */}
      {selectedMedia.length > 0 && (
        <Box sx={{ mb: 3, p: 1, bgcolor: 'primary.light', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ ml: 2 }}>
            {selectedMedia.length} items selected
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex' }}>
            <Button startIcon={<DownloadIcon />} size="small" sx={{ mr: 1 }}>
              Download
            </Button>
            <Button startIcon={<ShareIcon />} size="small" sx={{ mr: 1 }}>
              Share
            </Button>
            <Button startIcon={<DeleteIcon />} color="error" size="small">
              Delete
            </Button>
          </Box>
        </Box>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="media tabs">
          <Tab icon={<FilterListIcon />} label="All Media" {...a11yProps(0)} />
          <Tab icon={<PhotoIcon />} label="Images" {...a11yProps(1)} />
          <Tab icon={<VideoLibraryIcon />} label="Videos" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Media Content */}
      <TabPanel value={tabValue} index={0}>
        <ImageList cols={3} gap={16}>
          {sortedMedia.map((media) => (
            <ImageListItem 
              key={media.id}
              onClick={() => handlePreviewMedia(media)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s',
                  boxShadow: 3,
                }
              }}
            >
              <img
                src={media.thumbnail}
                alt={media.title}
                loading="lazy"
                style={{ height: 200, objectFit: 'cover' }}
              />
              <ImageListItemBar
                title={media.title}
                subtitle={
                  <span>
                    {media.type === 'video' && `${media.duration} • `}
                    {formatDate(media.dateAdded)}
                  </span>
                }
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${media.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaSelect(media.id);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>

        {sortedMedia.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No media found matching your filters.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters.
            </Typography>
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ImageList cols={3} gap={16}>
          {sortedMedia.map((media) => (
            <ImageListItem 
              key={media.id}
              onClick={() => handlePreviewMedia(media)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s',
                  boxShadow: 3,
                }
              }}
            >
              <img
                src={media.thumbnail}
                alt={media.title}
                loading="lazy"
                style={{ height: 200, objectFit: 'cover' }}
              />
              <ImageListItemBar
                title={media.title}
                subtitle={formatDate(media.dateAdded)}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${media.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaSelect(media.id);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>

        {sortedMedia.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No images found matching your filters.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters.
            </Typography>
          </Box>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <ImageList cols={3} gap={16}>
          {sortedMedia.map((media) => (
            <ImageListItem 
              key={media.id}
              onClick={() => handlePreviewMedia(media)}
              sx={{ 
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s',
                  boxShadow: 3,
                }
              }}
            >
              <img
                src={media.thumbnail}
                alt={media.title}
                loading="lazy"
                style={{ height: 200, objectFit: 'cover' }}
              />
              <ImageListItemBar
                title={media.title}
                subtitle={`${media.duration} • ${formatDate(media.dateAdded)}`}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                    aria-label={`info about ${media.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaSelect(media.id);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>

        {sortedMedia.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No videos found matching your filters.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters.
            </Typography>
          </Box>
        )}
      </TabPanel>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={handleUploadDialogClose}
        aria-labelledby="upload-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="upload-dialog-title">Upload Media</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Select files to upload to the media gallery.
          </DialogContentText>
          
          {!isUploading ? (
            <Box 
              sx={{ 
                border: '2px dashed #ccc', 
                borderRadius: 2, 
                p: 3, 
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 1 }}>
                Drag & drop files here
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                or
              </Typography>
              <Button variant="contained" component="label">
                Browse Files
                <input type="file" hidden multiple />
              </Button>
              <Typography variant="caption" sx={{ display: 'block', mt: 2 }}>
                Supported formats: JPG, PNG, GIF, MP4, MOV
              </Typography>
            </Box>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={uploadProgress} 
                sx={{ height: 10, borderRadius: 5 }} 
              />
              <Typography variant="caption" sx={{ display: 'block', mt: 1, textAlign: 'right' }}>
                {uploadProgress}%
              </Typography>
            </Box>
          )}
          
          {!isUploading && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Media Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="Title" fullWidth size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    label="Tags (comma separated)" 
                    placeholder="class, students, event, etc."
                    fullWidth 
                    size="small" 
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      defaultValue="classes"
                    >
                      <MenuItem value="classes">Classes</MenuItem>
                      <MenuItem value="events">Events</MenuItem>
                      <MenuItem value="facility">Facility</MenuItem>
                      <MenuItem value="tutorials">Tutorials</MenuItem>
                      <MenuItem value="achievements">Achievements</MenuItem>
                      <MenuItem value="staff">Staff</MenuItem>
                      <MenuItem value="materials">Materials</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            onClick={simulateUpload} 
            variant="contained" 
            disabled={isUploading}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Media Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {previewMedia && (
          <>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                {previewMedia.type === 'image' ? (
                  <img 
                    src={previewMedia.thumbnail} 
                    alt={previewMedia.title} 
                    style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                  />
                ) : (
                  <Box 
                    sx={{ 
                      height: 400, 
                      bgcolor: 'black', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <Typography variant="body1" color="white">
                      Video Player Placeholder
                    </Typography>
                  </Box>
                )}
              </Box>
              
              <Typography variant="h6">{previewMedia.title}</Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                {formatDate(previewMedia.dateAdded)} • {previewMedia.fileSize}
                {previewMedia.type === 'video' && ` • ${previewMedia.duration}`}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                {previewMedia.tags.map((tag: string) => (
                  <Chip key={tag} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                ))}
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Category: {previewMedia.category.charAt(0).toUpperCase() + previewMedia.category.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Type: {previewMedia.type.charAt(0).toUpperCase() + previewMedia.type.slice(1)}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              {previewMedia.type === 'image' && (
                <Button startIcon={<DownloadIcon />}>
                  Download
                </Button>
              )}
              <Button startIcon={<ShareIcon />}>
                Share
              </Button>
              <Button startIcon={<DeleteIcon />} color="error">
                Delete
              </Button>
              <Button onClick={() => setPreviewDialogOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Menu */}
      <Menu
        id="media-menu"
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Download</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default MediaGallery;