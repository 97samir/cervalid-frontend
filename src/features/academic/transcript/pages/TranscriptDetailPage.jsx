import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import TranscriptItemModal from "../components/TranscriptItemModal";
import TranscriptSummaryCard from "../components/TranscriptSummaryCard";
import TranscriptItemsTable from "../components/TranscriptItemsTable";
import IssueCertificateModal from "../components/IssueCertificateModal";

import { useTranscript } from "../hooks/useTranscript";
import { useAddTranscriptItem } from "../hooks/useAddTranscriptItem";
import { useUpdateTranscriptItem } from "../hooks/useUpdateTranscriptItem";
import { useDeleteTranscriptItem } from "../hooks/useDeleteTranscriptItem";
import { useFinalizeTranscript } from "../hooks/useFinalizeTranscript";

import { useIssueCertificate } from "../../certificate/hooks/useIssueCertificate";

export default function TranscriptDetailPage() {
    
    const EMPTY_ITEM = {
        courseCode: "",
        courseName: "",
        credits: 1,
        grade: "",
    };

    const [showModal, setShowModal] = useState(false);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [form, setForm] = useState(EMPTY_ITEM);

    const { transcriptPublicId } = useParams();

    const navigate = useNavigate();

    const {
        data: transcript,
        isLoading,
        error,
    } = useTranscript(transcriptPublicId);

    const addMutation = useAddTranscriptItem();
    const updateMutation = useUpdateTranscriptItem();
    const deleteMutation = useDeleteTranscriptItem();
    const finalizeMutation = useFinalizeTranscript();
    const issueMutation = useIssueCertificate();

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            No fue posible cargar el historial académico.
        </div>
        );
    }

    const handleCreate = () => {
        setEditingItem(null);
        setForm(EMPTY_ITEM);
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);

        setForm({
        courseCode: item.courseCode ?? "",
        courseName: item.courseName ?? "",
        credits: item.credits ?? 1,
        grade: item.grade ?? "",
        });

        setShowModal(true);
    };

    const handleDelete = (itemPublicId) => {
        const confirmed = window.confirm("¿Está seguro de eliminar este curso?");

        if (!confirmed) return;

        deleteMutation.mutate({
        transcriptPublicId,
        itemPublicId,
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingItem(null);
        setForm(EMPTY_ITEM);
    };

    const handleSubmitItem = (formData) => {
        const options = {
        onSuccess: () => {
            handleCloseModal();
        },
        };

        if (editingItem) {
        updateMutation.mutate(
            {
            transcriptPublicId,
            itemPublicId: editingItem.publicId,
            data: formData,
            },
            options,
        );
        } else {
        addMutation.mutate(
            {
            transcriptPublicId,
            data: formData,
            },
            options,
        );
        }
    };

    const handleFinalize = () => {
        const confirmed = window.confirm(
        "¿Está seguro de finalizar este historial académico?",
        );

        if (!confirmed) return;

        finalizeMutation.mutate(transcriptPublicId);
    };

    const handleIssue = () => {
        setShowIssueModal(true);
    };

    const handleCloseIssueModal = () => {
        setShowIssueModal(false);
    };

    const handleSubmitIssue = (formData) => {
        issueMutation.mutate(
        {
            transcriptPublicId,
            type: formData.type,
            title: formData.title,
            awardedAt: formData.awardedAt,
            documentHash: formData.documentHash || null,
            documentUrl: formData.documentUrl || null,
        },
        {
            onSuccess: () => {
            setShowIssueModal(false);
            },
        },
        );
    };

    return (
        <div className="container-fluid">
        {/* HEADER*/}

        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="fw-bold mb-1">Historial Académico</h2>

                <p className="text-muted mb-0">
                Consulte y administre los cursos registrados.
                </p>
            </div>

            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
            >
                Volver
            </button>
            </div>
        </div>

        {/*  RESUMEN*/}

        <TranscriptSummaryCard
            transcript={transcript}
            onFinalize={handleFinalize}
            onIssue={handleIssue}
            finalizing={finalizeMutation.isPending}
            issuing={issueMutation.isPending}
        />

        {/*  CURSOS*/}

        <TranscriptItemsTable
            transcript={transcript}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />

        {/*  MODAL CURSO */}

        <TranscriptItemModal
            show={showModal}
            form={form}
            setForm={setForm}
            editingItem={editingItem}
            onClose={handleCloseModal}
            onSubmit={handleSubmitItem}
            loading={addMutation.isPending || updateMutation.isPending}
        />

        {/*  MODAL EMISIÓN */}

        <IssueCertificateModal
            show={showIssueModal}
            onClose={handleCloseIssueModal}
            onSubmit={handleSubmitIssue}
            loading={issueMutation.isPending}
        />
        </div>
    );
}
