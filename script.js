$(document).ready(function() {
    let videoId = '';
    let questionCounter = 1;

    // Check if jQuery UI is available before initializing resizable
    if ($.fn.resizable) {
        $(".right-pane").resizable({
            handles: "w",
            minWidth: 200,
            maxWidth: $(window).width() - 400,
            resize: function(event, ui) {
                var remainingSpace = $(window).width() - ui.size.width;
                $('.left-pane').width(remainingSpace - 46); // Adjusted for margins and splitter
            }
        });
    } else {
        console.warn("jQuery UI is not loaded. Resizable functionality is disabled.");
    }

    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : false;
    }

    function embedYouTubeVideo(videoId) {
        $('#videoPlayer').html(`
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
        `);
    }

    $('#askBtn').on('click', function() {
        const question = $('#questionInput').val().trim();
        if (question) {
            askQuestion(question);
            $('#questionInput').val('');
        }
    });

    function askQuestion(question) {
        const qaItem = $('<div>').addClass('qa-item');
        const questionElement = $('<div>').addClass('question').text(`Q${questionCounter}: ${question}`);
        const answerElement = $('<div>').addClass('answer').text('Loading answer...');
        
        qaItem.append(questionElement).append(answerElement);
        $('#qaList').prepend(qaItem);

        // Simulate API call to get answer (replace with actual API call)
        setTimeout(() => {
            const fakeAnswer = `This is a simulated answer to question ${questionCounter}. Replace this with the actual API call to get the real answer.`;
            answerElement.text(fakeAnswer);
        }, 1000);

        questionCounter++;
    }

    // Initially hide the Q&A section
    $('#qaSection').hide();

    $('#summarizeBtn').click(function() {
        const videoUrl = $('#videoInput').val();
        videoId = getYouTubeVideoId(videoUrl);

        if (videoId) {
            embedYouTubeVideo(videoId);
            $('#summary').html('<p><span class="material-icons">hourglass_empty</span> Summarizing video...</p>');

            // Simulate API call with setTimeout
            setTimeout(function() {
                const mockSummary = "This is a mock summary of the video. It covers the main points discussed in the lecture, including key concepts and examples.";
                $('#summary').html(`
                    <h2><span class="material-icons">description</span> Video Summary:</h2>
                    <p>${mockSummary}</p>
                    <p>You can now ask questions about the video content.</p>
                `);
                $('#qaSection').show();
            }, 2000);
        } else {
            alert('Invalid YouTube URL. Please try again.');
        }
    });
});
